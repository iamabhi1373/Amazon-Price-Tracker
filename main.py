

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from notifypy import Notify
import os
from bs4 import BeautifulSoup
from datetime import datetime

from pymongo import MongoClient


client = MongoClient("mongodb://localhost:27017/")
db = client["amazon2"]
collection = db["prices"]



# Insert the sample data into the "prices" collection


def create_database_collection():
    # Check if the database and collection exist, and create them if not
    if "amazon" not in client.list_database_names():
        print("Creating 'amazon' database...")
        db = client["amazon"]
    else:
        db = client["amazon"]

    if "prices" not in db.list_collection_names():
        print("Creating 'prices' collection...")
        collection = db["prices"]
    else:
        collection = db["prices"]









def get_data():

    options = Options()
    user_agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"

    options.add_argument("--headless")
    with open ("products.txt") as f:
        products = f.readlines()

        driver = webdriver.Chrome(options=options)
        

        
        
        for product in products:
            driver.get(f"https://www.amazon.in/dp/{product}")
            
           
            page_source = driver.page_source
            with open(f"data/{product}.html","w", encoding="utf-8") as f:
                f.write(page_source)



def extract_data():
    files = os.listdir("data")
    for file in files:
        print(file)
        with open(f"data/{file}", encoding="utf-8") as f:
            content = f.read()
            soup = BeautifulSoup(content, 'html.parser')
            title = soup.title.getText().split(":")[0]
            time = datetime.now()

            price = soup.find(class_="a-price-whole")
            if price:
                priceInt =price.getText().replace(',', '')
                print(priceInt)
                collection.insert_one({"priceInt":priceInt, "title": title, "time": time })

            else:
               
                continue


            table = soup.find(id="productDetails_detailsBullets_section1")
            if table:
                asin = table.find(class_="a-size-base prodDetAttrValue").getText()
                print("ASIN:", asin)
            else:
                continue


            
          

          #  with open("finaldata.txt","w") as f:
           #     f.write(f"{priceInt}~~{asin}~~{title}~~{time}")

            

            


       # print(priceInt, title,time)
       # with open("finaldata.txt","w") as f:
         
   

if __name__ == "__main__":

    notification = Notify()
    notification.title = "Cool Title"
    notification.message = "Even cooler message."
    notification.send()

   # get_data()
    create_database_collection() 
    extract_data()
   
    




