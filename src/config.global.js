
// const PROJECT_MODE = "development"
const PROJECT_MODE = "deployment" 

const developmentConfig = {
  BACKEND_URL: "http://localhost:8000"
}

const deploymentConfig = {
  BACKEND_URL: "http://dashboard.inspix.tech:3000"
}

const getConfig = () => {
  if (PROJECT_MODE === "development") {
    return developmentConfig
  } else if (PROJECT_MODE === "deployment") {
    return deploymentConfig
  }
}

export default getConfig;