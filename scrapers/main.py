# https://medium.com/@mikelcbrowne/running-chromedriver-with-python-selenium-on-heroku-acc1566d161c
import re
from selenium import webdriver 
from selenium.webdriver.common.by import By 
from selenium.webdriver.support.ui import WebDriverWait 
from selenium.webdriver.support import expected_conditions as EC 
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import Select


BAD_WORDS = ['Sample', 'Big']

def scrape_page(driver):
    cards = driver.find_elements_by_class_name("grid-view-item__link")
    i = 0
    while i < len(cards) - 1:
        card = driver.find_elements_by_class_name("grid-view-item__link")[i]
        product = card.find_element_by_class_name("visually-hidden").text
        if set(BAD_WORDS) & set(product.split(' ')):
            i += 1
            continue
        card.click()
        try:
            types = Select(driver.find_element_by_id('SingleOptionSelector-0'))
            name = driver.find_element_by_class_name("product-single__title").text
            name = re.sub(r' Switches', '', name)
            for j, o in enumerate(types.options):
                if j == 0:
                    continue
                else:
                    name = f"{name} {o.text}"
        except:
            name = driver.find_element_by_class_name("product-single__title").text
            name = re.sub(r' Switches', '', name)
        i += 1
        driver.back()

    
def get_page_nums(driver):
    pagination = driver.find_element_by_class_name("pagination")
    pages = pagination.find_element_by_class_name("pagination__text").text
    return re.findall(r"\d+", pages)


def main():
    driver = webdriver.Chrome()
    driver.get("https://novelkeys.xyz/collections/switches")
    page_nums = get_page_nums(driver)

    while page_nums[0] != page_nums[-1]:
        scrape_page(driver)
        (driver
            .find_element_by_class_name("pagination")
            .find_element_by_css_selector("a")
            .click())
        page_nums = get_page_nums(driver)
    scrape_page(driver)
    driver.close()


if __name__ == "__main__":
    main()