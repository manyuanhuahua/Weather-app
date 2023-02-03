# Adaptavist-project: My Weather App
## Introduction
My Weather App is a morden weather search web application that allows users to get current weather status based on user's location and search for desired location's weather info. This documentation provides instructions for deploying the My Weather App to a production environment. The deployment process has been automated using Github Actions and Docker container, to ensure that it is repeatable, reliable and easy to execute.

## Prerequisites
Before deploying this application, make sure that you have the following:
The necessary permissions to install dependencies and configure the production environment.

## Deployment Process
1. run 'npm run build' to build the production version of the project.
2. Choose a hosting platform to deploy the project. Some options include:
  Heroku
  AWS
  Firebase
3. Once the hosting platform selected, follow the platform's instructions for deploying this application
4. The project should now be deployed and accessible from the URL provided by your hosting platform.

If you encounter any issues with deployment, make sure that the package.json file includes a scripts section with a start script. 

## Project Overview
### Home page
Get current weather data based on user's location and display astronomy image for everyday.
![image](https://user-images.githubusercontent.com/101086307/216539479-480ca976-6ded-40d6-a51c-ce5aa164f533.png)

### 5 Days Weather Forecasting based on location search
![image](https://user-images.githubusercontent.com/101086307/216539716-c26e0259-183d-4e28-ba17-b446336516db.png)

### Selected daily Weather Forecasting on 3 hours timestamp
![image](https://user-images.githubusercontent.com/101086307/216539877-19585189-74b3-46c4-9694-43f7daa0622d.png)


## Technial Assistant
If you still have trouble deploying your project, check the hosting platform's documentation or reach out to their support team for assistance.

