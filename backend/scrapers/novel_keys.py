# https://medium.com/@mikelcbrowne/running-chromedriver-with-python-selenium-on-heroku-acc1566d161c
import re
from collections import namedtuple
from selenium import webdriver 
from selenium.webdriver.common.by import By 
from selenium.webdriver.support.ui import WebDriverWait 
from selenium.webdriver.support import expected_conditions as EC 
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from selenium.webdriver.support.ui import Select

from ..models.product import Product
from ..models.vendor import Vendor
from ..models.vendor_product_association import VendorProductAssociation
from ..models.types import ProductType, LayoutType, SizeType


product = namedtuple('product', 'url type ignore')
PRODUCT_URLS = [
    product('switches', ProductType.switch, ['Sample', 'Big']),
    product('keycaps', ProductType.keyset, [])
]

# TODO: Add comments for each method
# TODO: Scrape price and stock status
# TODO: Make a base class to share between other scrapers


class NovelKeys():

    def __init__(self, session, driver):
        self.session = session
        self.driver = driver
        self.vendor_url = "https://novelkeys.xyz/collections/" 
        self.vendor, _ = Vendor.get_or_create(self.session, name='NovelKeys', url=self.vendor_url)
        self.results = []

    def run(self):
        for product in PRODUCT_URLS:
            self.driver.get(f"{self.vendor_url}{product.url}")
            self._run(product)

    def _run(self, product):
        page_nums = self._get_pagination()
        if page_nums:
            while page_nums[0] != page_nums[-1]:
                self._scrape_each_on_page(product)
                (self.driver
                    .find_element_by_class_name("pagination")
                    .find_element_by_css_selector("a")
                    .click())
                page_nums = self._get_pagination()
            self._scrape_each_on_page(product)
        else:
            self._scrape_each_on_page(product)
    
    def _scrape_each_on_page(self, product):
        cards = self.driver.find_elements_by_class_name("grid-view-item__link")
        i = 0
        while i < len(cards) - 1:
            card = self.driver.find_elements_by_class_name("grid-view-item__link")[i]
            name = card.find_element_by_class_name("visually-hidden").text
            if set(product.ignore) & set(name.split(' ')):  # ignore products containing bad words
                i += 1
                continue
            card.click()
            self._scrape_and_insert(product)
            i += 1
            self.driver.back()
    
    def _scrape_and_insert(self, product):
        name = self.driver.find_element_by_class_name("product-single__title").text
        price = 1.0
        in_stock = True
        options = self._get_options()
        if options:
            names = [f"{name} {o.text}" for o in options.options[1:]]
        else:
            names = [name]
        for name in names:
            self._update_or_insert(
                price,
                in_stock,
                name=name,
                img_url='',
                type=product.type
            )                        

    def _update_or_insert(self, price, in_stock, **kwargs):
        product, is_new = Product.get_or_create(
            self.session,
            **kwargs
        )
        pv, is_new = VendorProductAssociation.get_or_create(
            self.session,
            product_id=product.id,
            vendor_id=self.vendor.id
        )
        pv.price = price
        pv.in_stock = in_stock
        self.session.commit()

    def _get_pagination(self):
        try:
            pagination = self.driver.find_element_by_class_name("pagination")
        except NoSuchElementException:
            return None
        
        pages = pagination.find_element_by_class_name("pagination__text").text
        return re.findall(r"\d+", pages)

    def _get_options(self):
        try:
            types = Select(self.driver.find_element_by_id('SingleOptionSelector-0'))
        except NoSuchElementException:
            return None
        return types
