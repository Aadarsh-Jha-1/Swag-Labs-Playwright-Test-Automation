# Swag Labs Test Automation with Playwright (POM)

## Project Overview
This project demonstrates the use of **Playwright** to create end-to-end test automation scripts for the **Swag Labs demo website** ([Swag Labs](https://www.saucedemo.com/)). The test automation framework follows the **Page Object Model (POM)** design pattern, which helps maintain clean, modular, and reusable test scripts.

The Swag Labs website is an e-commerce platform where users can browse and purchase products. The automated tests focus on validating key functionalities such as login, sorting, navigation, and cart management.

---

## Technologies Used
- **Playwright**: A Node.js library to automate Chromium, Firefox, and WebKit browsers. It provides fast, reliable, and secure end-to-end testing.
- **Page Object Model (POM)**: A design pattern that promotes separation of concerns by creating separate classes for each web page in the application. Each class contains the interaction methods for the page.
- **JavaScript (ES6)**: For writing test scripts and utilizing Playwright’s API.
- **Test Runner**: Playwright's built-in test runner for executing test cases.

---

## Project Structure
The project follows a structured approach with modular components to organize the test scripts and page objects.

```plaintext
SwagLabsTestAutomation/
│
├── Resources/
│   ├── functions.js            # Helper functions like login, logout, etc.
│   ├── test-Data.js            # Test data (e.g., username, password)
│   └── urls.js                 # URLs for the pages
│
├── Pages/
│   ├── loginPage.js            # Page object for the login page
│   ├── inventoryPage.js        # Page object for the inventory page
│   ├── cartPage.js             # Page object for the cart page
│   └── productPage.js          # Page object for a product page
│
├── tests/
│   └── inventory.test.js       # Test script for testing inventory page actions
│   └── login.test.js           # Test script for testing login functionality
│   └── cart.test.js            # Test script for testing cart functionality
│   └── navigation.test.js      # Test script for testing navigation bar actions
│
├── playwright.config.js        # Playwright configuration file
└── README.md                   # Project documentation
