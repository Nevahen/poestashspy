import json
import time
import sys
import pymysql.cursors
import requests
import warnings


def gggApi():

    global nextID
    global db_connection

    print("Starting GGG Api Crawler")

    db_connection = connect_db()
    nextID = get_latest_change_id()

    warnings.filterwarnings("ignore")

    gggLoop()

# Init DB or Die


def connect_db():
    dbhost = "192.168.1.109"
    dbuser = "poestashspy"
    dbpass = "poestashspy"

    try:
        connection = pymysql.connect(
            dbhost, dbuser, dbpass,
            'poestashspy',
            cursorclass=pymysql.cursors.DictCursor)
        print("Connected to database", dbuser, "@", dbhost)
        connection.set_charset('utf8')
        return connection
    except:
        print("Unexcepted error:", sys.exc_info()[0])
        raise


# Requesting next id from poe ninja api
def get_latest_change_id():
    url = "https://poe.ninja/api/Data/GetStats"

    try:
        r = requests.get(url)
        r = json.loads(r.text)
        print('POE Ninja: Next change is', r['next_change_id'])

        return r['next_change_id']

    except ConnectionRefusedError:
        print("POE Ninja: Connection Refused!")

    except TimeoutError:
        print("POE Ninja: Timed out!")

    except:
        print("POE Ninja: Unexpected Error")

# Infinite loop for PoE Stash Api


def gggLoop():
    cur = db_connection.cursor()
    while True:
        print(nextID)
        time.sleep(1)
        get_ggg_data()


def get_ggg_data():
    global nextID
    url = "http://www.pathofexile.com/api/public-stash-tabs?id=" + nextID
    print(url)
    r = requests.get(url)
    r = json.loads(r.text)

    if not r['next_change_id']:
        print("Is PoE Api down?")
        return

    nextID = r['next_change_id']

    process_ggg_data(r)


def process_ggg_data(data):

    sql = "INSERT IGNORE into accounts (accountName) VALUES (%s);"
    sql2 = "INSERT IGNORE into stashes (stashName,stashType,itemData,league,accountName,stashUniqueID) VALUES (%s,%s,%s,%s,%s,%s);"
    # Skip empty account names and empty stashes
    for x in data['stashes']:
        if x['accountName'] and x['items']:
            cur = db_connection.cursor()

            cur.execute(sql, x['accountName'])
            cur.execute(sql2, (x['stash'], x['stashType'], json.dumps(
                x['items'], ensure_ascii=False), x['items'][0]['league'], x['accountName'], x['id']))

            db_connection.commit()
            cur.close


if __name__ == "__main__":
    gggApi()
