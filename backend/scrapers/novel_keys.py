# https://medium.com/@mikelcbrowne/running-chromedriver-with-python-selenium-on-heroku-acc1566d161c
import re
from collections import namedtuple
from selenium import webdriver 
from selenium.webdriver.common.by import By 
from selenium.webdriver.support.ui import WebDriverWait 
from selenium.webdriver.support import expected_conditions as EC 
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import Select

from ..models.product import Product
from ..models.types import ProductType, LayoutType, SizeType


product = namedtuple('product', 'url type')
PRODUCT_URLS = [
    product('switches', ProductType.switch),
    product('keycaps', ProductType.keyset)
]
BAD_WORDS = ['Sample', 'Big']


class NovelKeys():

    def __init__(self, session, driver):
        self.session = session
        self.vendor_url = "https://novelkeys.xyz/collections/" 
        self.driver = driver
        self.results = []

    def run(self):
        for product in PRODUCT_URLS:
            self.driver.get(f"{self.vendor_url}{product.url}")
            self._run(product)

    def _run(self, product):
        try:
            page_nums = self.get_page_nums()

            while page_nums[0] != page_nums[-1]:
                self.scrape_page(product)
                (self.driver
                    .find_element_by_class_name("pagination")
                    .find_element_by_css_selector("a")
                    .click())
                page_nums = self.get_page_nums()
            self.scrape_page(product)
        except:
            self.scrape_page(product)
        self.session.add_all(self.results)
        self.session.commit()

    def scrape_page(self, product):
        cards = self.driver.find_elements_by_class_name("grid-view-item__link")
        i = 0
        while i < len(cards) - 1:
            card = self.driver.find_elements_by_class_name("grid-view-item__link")[i]
            name = card.find_element_by_class_name("visually-hidden").text
            if set(BAD_WORDS) & set(name.split(' ')):  # ignore products containing bad words
                i += 1
                continue
            card.click()
            try:
                types = Select(self.driver.find_element_by_id('SingleOptionSelector-0'))
                name = self.driver.find_element_by_class_name("product-single__title").text
                for j, o in enumerate(types.options):
                    if j == 0:
                        continue
                    else:
                        self.results.append(Product(
                            name=f"{name} {o.text}",
                            img_url='',
                            type=product.type,
                            price=1.0
                        ))
            except:
                name = self.driver.find_element_by_class_name("product-single__title").text
                self.results.append(Product(
                    name=name,
                    img_url='',
                    type=product.type,
                    price=1.0
                ))
            i += 1
            self.driver.back()
        
    def get_page_nums(self):
        pagination = self.driver.find_element_by_class_name("pagination")
        pages = pagination.find_element_by_class_name("pagination__text").text
        return re.findall(r"\d+", pages)
