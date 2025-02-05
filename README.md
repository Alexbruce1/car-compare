# Car Compare

## Overview

Car Compare is a React-based web application designed to help users compare the specifications of various cars. This project was built both as a practical tool for car buyers, particularly my dad who enjoys seeing all the details when shopping for a car, and as a learning experience to strengthen my skills in React and API integration.

## Features

- Select a **year**, **make**, and **model** to see relevant car specs.
- Pulls **real-time car data** from APIs like FuelEconomy.gov and CarQuery.
- Displays key specifications such as:
  - **Fuel economy (MPG)**
  - **Fuel type**
  - **Transmission**
  - **Engine size**
  - **Horsepower**
  - **Torque**
  - **Vehicle dimensions**
  - **0-60 acceleration times (if available)**
- Filters models based on the selected year, ensuring only valid options are displayed.

## Technologies Used

- **React.js** for the front-end.
- **Fetch API** for making requests.
- **FuelEconomy.gov API** for fuel efficiency data.
- **CarQuery API** for performance specs (horsepower, torque, etc.).
- **CSS** for styling.

## How to Run the Project

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/car-compare.git
   cd car-compare
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
4. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## Future Enhancements

- Improve UI/UX with a cleaner design.
- Add a **side-by-side comparison** feature for multiple vehicles.
- Include pricing estimates and reliability ratings.
- Save user-selected cars for quick comparisons.
- Add more APIs for even richer vehicle data.

## Contributions

Contributions are welcome! Feel free to fork the repo and submit pull requests with improvements.

## License

This project is open-source under the **MIT License**.

---

Built for fun, learning, and helping my dad find the perfect car! 🚗💨
