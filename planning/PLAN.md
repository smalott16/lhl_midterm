## Option 6: Smart TODO List
When you are recommended something it's not always easy to jot it down for later in an organized fashion. Adding the item to your phone or computer ends up taking time and opening up the right app is only part of the problem. You then have to locate the right list ("Movies to watch", "Books to read", etc.) to add to. And if you do get it in to the right list, you don't have much more context about it. This delay and lack of additional information acts as a huge deterrent.

The solution? A smart, auto-categorizing todo list app. The user simply has to add the name of the thing, and it gets put into the correct list.

Requirements:
Each todo created should be categorized as one of:

Film / Series (To watch)
Restaurants, cafes, etc. (To eat)
Books (To read)
Products (To buy)
In order to determine the category the app will probably need to use various API services such as those offered by Google, Wolfram Alpha, Rotten Tomatoes, Amazon, Yelp and others.

API services mentioned above are only suggestions. You will have to investigate how to balance the accurate categorization of items with having to deal with multiple API endpoints.

Users should be able to change a category of an item in case it was mis-categorized or could not be categorized at all.

Users should be able to register, log in, log out and update their profile.

## CREATE USER STORIES
As a ____ I can ____ because ____.

### MVD
[x] As a USER I can _view_ my TODO LIST to review it.
[x] As a USER I can _add_ a LIST ITEM because that gets automatically put in a CATEGORY.
[x] As a USER I can _delete_ a LIST ITEM because I don't want to do it anymore.
[x] As a USER I can _complete_ a LIST ITEM because I don't want to do it anymore.
[x] As a USER I can _re-categorize/categorize_ a LIST ITEM because I categorized it in the wrong CATEGORY OR it was not categorized in the first place.
[x] As a _non-logged in USER_ I am directed to an information/register page. 

### STRETCH
[x] As a USER I can _LOG IN_ and _LOG OUT_ to give me access to my specific LIST ITEMS
[x] As a USER I can _prioritize_ and _Un-prioritize_ LIST ITEMS because some are more important to me than others.

As a USER I can _send_ a TO DO LIST to a friend because I need help with the list.
As a USER I can _change_ the color of my TO DO LISTS to my preference

## NOUNS
- USERS
- TODO LIST
- LIST ITEM
- CATEGORY

## ROUTES
B - GET 	/ users  
R - GET		/ users / : id 
E - POST	/ users / : id
A - POST	/ users
D - POST	/ users / : id / delete    
			    *differentiates this from the identical POST (edit) path

If we are going to have client side rendering for the list actions (add, edit, delete, complete), what do our routes look like as we will be using JQuery to modify the DOM, not redirect? 

App will be SPA except for registration/info page for non-logged in or non-users. 

GET / users / register

## APIs
- Wolfram Alpha
- Imdb
- Rotten Tomatoes 
- Amazon

## Pages

-Register/login/Info about app
-Logged in home page
-Watch
-Eat
-Read
-Buy
-Priorities

## THURSDAY PLAN
- speed up wolfram-alpha api


## FRIDAY PRESENTATION

### Introduction
- overview of the app and why we chose it

Spencer: we wated to take on a project we both thought was acheivable while still taking on challanges that we wanted to learn about such as API calls. 

Katie: Also interested in api and uses a lot of to-do lists and so she had the VISION  

### DEMO (Spencer Speaks, Katie Drives)

- Start on the login page - we are already logged in - brief overview of page then navigate to the lists page
- While on lists page
  - This page is the the primary jumping-off point of the app
  - A place where users can enter items into their smart todo list
  - Below we have our list categories (Eat, watch, read, and buy)
  - *READ* Draw attention to the number of items in the list 
  		(open a list as an example to reveal existing list items, then nav back to lists page)
  - Lets try a few items!
    * *ADD* Katie enters (The Catcher in Rye) - show list
    * *RECATEGORIZE/EDIT* Katie enters Harry Potter - hey i meant the movie! Lets re-categorize it and then go to movies list
    * Katie "I actaully ate there last night (Model Milk), *COMPLETE IT* 
	* Can you also delete an item? *DELETE* 
	* I cannot wait to go back to Kelowna and eat at Cedar Creek, so I'm going to prioritize this one for later.
	* You know what, I eat at model milk alot, I'm just going to *DELETE IT*

## CHALLENGES
- The wolfram API was the first we were able to get working so we used it to categorize for all our categories and later realized it was limited and had to add additional APIs to check for books, movies/tv show, and restaurants to better specify out categorization.

## WHAT WENT WELL
- Individual strengths were complimentary, we communicated well throughout the process.

Spencer was able to help me better understand how the backend and routing worked and I was able to help him understand more of the front end styling CSS. 

- We pair programmed the majority of our project. This helped us both solidify a full understanding of how everything works full stack. 

- However, we did divide some work vertically -
	 Spencer completed the ERDs, database, and researching our APIs. 
	 I took the lead on wire frames, HTML&CSS 
	 
Thank you for watching our presentation.
