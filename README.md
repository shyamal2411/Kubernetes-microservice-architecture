## Overview

This project is a Node.js application that consists of two microservices, `kube1` and `kube2`, which communicate with each other to process CSV files containing product data. The application allows users to upload CSV files and calculate the sum of specified product amounts.

 - **Microservices**: `Node JS`
 - **Containerization**: `Docker` 
 - **CI/CD**: `GCP Cloud Build` 
 - **Container registry**: `GCP Artifact Registry` 
 - **k8s cluster**: `Google Kubernetes Engine (GKE)` 
 - **Infrastructure as Code (IaC)**: `Terraform` 

## Architecture
<img width="869" alt="architecture" src="https://github.com/user-attachments/assets/669513ca-91f4-4c1b-9b0e-7dff26569efe" />

## How It Works

1. **Microservices Architecture**: The project is structured into two main services:
   - **kube1**: This service handles the file upload and initiates the file processing by sending a request to `kube2`.
   - **kube2**: This service processes the CSV file and calculates the sum of the specified product amounts.

2. **Endpoints**:
   - **kube1**:
     - `POST /calculate`: Accepts a JSON payload with the file name and product name, checks if the file exists, and forwards the request to `kube2`.
     - `POST /store-file`: Accepts a JSON payload to store a file in the specified directory.
   - **kube2**:
     - `POST /process`: Accepts a JSON payload with the file name and product name, reads the CSV file, and calculates the sum of the specified product.

3. **Data Storage**: The application uses a persistent volume to store uploaded files, ensuring that data is retained even if the containers are restarted.

## Getting Started

To get started with this project, follow these steps:

### Prerequisites

- Node.js (version 21.3.0 or higher)
- Docker
- Kubernetes (for deployment)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Navigate to each service directory (`kube1` and `kube2`) and install the dependencies:

   ```bash
   cd kube1
   npm install
   cd ../kube2
   npm install
   ```

### Running the Application Locally

1. Start the services using Docker:

   ```bash
   cd kube1
   docker build -t shyamal24/kube1:latest .
   docker run -p 6000:6000 shyamal24/kube1:latest
   ```

   ```bash
   cd kube2
   docker build -t shyamal24/kube2:latest .
   docker run -p 7070:7070 shyamal24/kube2:latest
   ```

2. Use a tool like Postman or curl to test the endpoints.

### Deploying to Kubernetes

1. Apply the Persistent Volume Claim:

   ```bash
   kubectl apply -f kubernetes/pvc.yml
   ```

2. Deploy the services:

   ```bash
   kubectl apply -f kubernetes/k8sCon1-deployment.yml
   kubectl apply -f kubernetes/k8sCon2-deployment.yml
   ```

3. Expose the services:

   ```bash
   kubectl apply -f kubernetes/k8sCon1-service.yml
   kubectl apply -f kubernetes/k8sCon2-service.yml
   ```

### Testing the Application

- Use Postman or curl to send a `POST` request to `kube1`'s `/calculate` endpoint with a JSON body containing the file name and product name.
