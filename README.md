# PoeStashSpy

PoeStashSpy is a tool to 'Spy' other peoples stashes like you would see them ingame (Public only).

This my personal project for learning Angular 5, so the codebase may smell a bit for now :-F

Python script collects data from GGG stash api to mysql server and NodeJS based backend + Angular 5
provides a way to view there stashes from browser

# How to run

### Dev mode:
---

`npm install`  
`pip install -r requirements.txt`  

import schemas from ./schemas/ to your db. *Ex:*

`mysql poestashspy -u poestashspy -p < ./schemas/poestashpy_accounts.sql;`

change DB connection info in ggg.py and app.js (Config file soon..?)


run ggg.py to fetch data from ggg api to database  
start backend api (port 3000)  
`supervisor app.js`  

launch front end (port 4200)  
`npm start`
