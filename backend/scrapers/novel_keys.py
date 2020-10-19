# https://medium.com/@mikelcbrowne/running-chromedriver-with-python-selenium-on-heroku-acc1566d161c
import re
from selenium import webdriver 
from selenium.webdriver.common.by import By 
from selenium.webdriver.support.ui import WebDriverWait 
from selenium.webdriver.support import expected_conditions as EC 
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import Select

from ..models.product import Product


BAD_WORDS = ['Sample', 'Big']


class NovelKeys():

    def __init__(self, session, driver):
        self.session = session
        self.vendor_url = "https://novelkeys.xyz/collections/switches" 
        self.driver = driver
        self.results = []

    def run(self):
        self.driver.get(self.vendor_url)
        page_nums = self.get_page_nums()

        while page_nums[0] != page_nums[-1]:
            self.scrape_page()
            (self.driver
                .find_element_by_class_name("pagination")
                .find_element_by_css_selector("a")
                .click())
            page_nums = self.get_page_nums()
        self.scrape_page()
        self.session.add_all(self.results)
        self.session.commit()

    def scrape_page(self):
        cards = self.driver.find_elements_by_class_name("grid-view-item__link")
        i = 0
        while i < len(cards) - 1:
            card = self.driver.find_elements_by_class_name("grid-view-item__link")[i]
            product = card.find_element_by_class_name("visually-hidden").text
            if set(BAD_WORDS) & set(product.split(' ')):
                i += 1
                continue
            card.click()
            try:
                types = Select(self.driver.find_element_by_id('SingleOptionSelector-0'))
                name = self.driver.find_element_by_class_name("product-single__title").text
                name = re.sub(r' Switches', '', name)
                for j, o in enumerate(types.options):
                    if j == 0:
                        continue
                    else:
                        self.results.append(Product(
                            name=f"{name} {o.text}",
                            img_url='',
                            type=1
                        ))
            except:
                name = self.driver.find_element_by_class_name("product-single__title").text
                name = re.sub(r' Switches', '', name)
                self.results.append(Product(
                    name=name,
                    img_url='',
                    type=1
                ))
                print(name)

            i += 1
            self.driver.back()
        
    def get_page_nums(self):
        pagination = self.driver.find_element_by_class_name("pagination")
        pages = pagination.find_element_by_class_name("pagination__text").text
        return re.findall(r"\d+", pages)
