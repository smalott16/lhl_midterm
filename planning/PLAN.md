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

As a USER I can _view_ my TODO LIST to review it.
As a USER I can _add_ a LIST ITEM because that gets automatically put in a CATEGORY.
As a USER I can _edit_ a LIST ITEM because I wrote it incorrectly.
As a USER I can _delete_ a LIST ITEM because I don't want to do it anymore.
As a USER I can _complete_ a LIST ITEM because I don't want to do it anymore.
As a USER I can _re-categorize/categorize_ a LIST ITEM because I categorized it in the wrong CATEGORY OR it was not categorized in the first place.
As a USER I can _prioritize_ LIST ITEMS because some are more important to me than others.

As a _non-logged in USER_ I am directed to an information/register page. 


-- STRETCH As a USER I can _send_ a TO DO LIST to a friend because I need help with the list.
-- STRETCH As a USER I can _change_ the color of my TO DO LISTS to my preference

## NOUNS
- USERS
- TODO LIST
- LIST ITEM
- CATEGORY

## ROUTES
