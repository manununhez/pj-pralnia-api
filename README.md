# Express Backend for Multi-Attribute Project

This Express backend serves as the API for the Multi-Attribute Project.

## Prerequisites

Before running this backend, ensure you have the following:

- Node.js installed on your machine
- Your prefered database set up and configured
- `.env` file configured with the required environment variables (`PORT`, database connection details, etc.)

## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.

## Usage

1. Start the Express server using `npm start`.
2. The server will be listening on port `5000` by default. You can change the port by setting the `PORT` environment variable.
3. Use the following endpoints:

   - `GET /versions`: Get versions data.
   - `GET /psform/:sex`: Get PS form data by gender.
   - `GET /apptext/:sex`: Get application text data by gender.
   - and more...

   For detailed documentation on each endpoint, refer to the inline comments in the code.

## Notes

- Ensure that your prefered DB is running and accessible by the backend.
- This backend uses CORS to allow cross-origin requests from any domain. Ensure proper security measures are in place.
- For file upload functionality, make sure the `public` directory is properly configured to serve static files.
- Handle authentication securely by storing sensitive information such as private keys in environment variables.
- For detailed API documentation, refer to the inline comments in the code.

