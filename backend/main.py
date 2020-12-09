from selenium import webdriver 
from selenium.webdriver.common.by import By 
from selenium.webdriver.support.ui import WebDriverWait 
from selenium.webdriver.support import expected_conditions as EC 
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import Select
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from scrapers.novel_keys import NovelKeys


def main(session, driver):
    NovelKeys(session, driver).run()


if __name__ == "__main__":
    engine = create_engine('postgres+psycopg2://vi:password@localhost:5432/kbpartpicker')
    session = sessionmaker(bind=engine)()
    driver = webdriver.Chrome()
    timeout = 3
    try:
        element_present = EC.presence_of_element_located((By.ID, 'main'))
        WebDriverWait(driver, timeout).until(element_present)
    except TimeoutException:
        print("Timed out waiting for page to load")
    finally:
        main(session, driver)
        driver.close()
        session.close()