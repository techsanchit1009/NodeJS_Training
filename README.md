# Day6 - Understanding of mongoose(Basic CRUD) + Controller-services  
---

### Create Rest Apis for Simple Inventry Management for Household goods so that during lockdown period one can get idea that how many items one have in home.


**1. Create a database connection using mongoose.**  

**Result:**  
> Check **server.js**

**2. Create mongoose schema for same day "Items" with appropiate properties, validations and pre/post hooks**  
* name : string, required  
* quantity: number, required  
* isSanitized: boolean  
* unit: string, required  
* expiryDate: Date  
* createdDate: automatically inserted current date and time  
* updatedDate: automatically inserted current date and time  
* category: possible values [Grocery, Medical, Fruits&Veg, Berverages, Babycare. Cleaning]  
* location: possible values [Store, Kitchen]  

**Result:**  
> Check **items/model.js** 

**3. Expose below endpoints**  
* **GET** : /items  
(To fetch all the items with all properties. Array of objects.)    
* **POST**: /items  
(To add new items in database if already present (check by name) then update the item.) 
* **PATCH**: /item/:id  
(Update existing item)
* **DELETE**: /item/:id  
(delete the exisitng item.)

**All the routes are listed in items/route.js file then points to items/controller.js file which  further points to items/service.js file where actually mongoose queries are written.**