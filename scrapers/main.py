# https://medium.com/@mikelcbrowne/running-chromedriver-with-python-selenium-on-heroku-acc1566d161c
from selenium import webdriver 
from selenium.webdriver.common.by import By 
from selenium.webdriver.support.ui import WebDriverWait 
from selenium.webdriver.support import expected_conditions as EC 
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import Select


def main():
    driver = webdriver.Chrome()
    driver.get("https://novelkeys.xyz/collections/switches")
    cards = driver.find_elements_by_class_name("grid-view-item__link")
    i = 0
    while i < len(cards) - 1:
        cards = driver.find_elements_by_class_name("grid-view-item__link")
        cards[i].click()
        try:
            types = Select(driver.find_element_by_id('SingleOptionSelector-0'))
        # if types:
            print([o.text for o in types.options])
        except:
        #     pass
        # else:
            print(driver.find_element_by_class_name("product-single__title").text)
        i += 1
        driver.back()
        


if __name__ == "__main__":
    main()