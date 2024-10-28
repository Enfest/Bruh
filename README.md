# Preliminary Diagnostic and Disease Monitoring Medical Service

## Summary

The Preliminary Diagnostic and Disease Monitoring Medical Service website offers several essential functions to assist users in managing their health and finding medical services. The main features include:

1. **Disease Distribution in Taipei City**: Visual representation of disease distribution across Taipei City.
2. **Convenient Search for Clinics and Hospitals**: Easy-to-use search functionality to find nearby clinics and hospitals.
3. **Preliminary Diagnose Robot**: An AI-powered tool to help users identify the appropriate medical department for their symptoms.

## Project Structure

- **Frontend**: Contains the entire user interface for the website, divided into two main parts.
    - **Part 1**: User interaction components, including forms and search functionalities.
    - **Part 2**: Visualization components, such as maps and charts for disease distribution.
- **Web**: Includes the API to connect to Google Maps for location-based services.
    - **Google Maps Integration**: Handles requests and responses to display maps and location data.
- **Backend**: Manages the connection to the database and supports communication with the preliminary diagnose robot, powered by OpenAI.

## Usage

To get started with the project, follow the instructions below:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-repo/preliminary-diagnostic-service.git
    cd preliminary-diagnostic-service
    ```

2. **Set up the Frontend**:
    - Navigate to the frontend directory:
        ```sh
        cd frontend
        ```
    - Install the necessary dependencies:
        ```sh
        npm install
        ```
    - Start the development server:
        ```sh
        npm start
        ```

3. **Configure the Google Maps API**:
    - Navigate to the web directory:
        ```sh
        cd ../web
        ```
    - Set up the environment variables for the Google Maps API key:
        ```sh
        export GOOGLE_MAPS_API_KEY=your_api_key_here
        ```
    - Install the necessary dependencies:
        ```sh
        npm install
        ```
    - Start the server:
        ```sh
        npm start
        ```

4. **Set up the Backend**:
    - Navigate to the backend directory:
        ```sh
        cd ../backend
        ```
    - Install the necessary dependencies:
        ```sh
        npm install
        ```
    - Configure the database connection and AI communication settings in the `.env` file:
        ```sh
        DB_CONNECTION_STRING=your_database_connection_string
        OPENAI_API_KEY=your_openai_api_key
        ```
    - Start the backend server:
        ```sh
        npm start
        ```

For detailed setup and configuration instructions, please refer to the respective README files in each directory.
