import requests
import socketio
import datetime
import time

# Base URL
BASE_URL = "http://localhost:3000"

# 1. Login
login_payload = {
    "username": "admin",
    "password": "psw"
}

session = requests.Session()
login_response = session.post(f"{BASE_URL}/api/login", json=login_payload)

if login_response.status_code != 200:
    print("Login failed:", login_response.text)
    exit()

print("Logged in successfully")
print()

# 2. Get generic plant id
gp_response = session.get(f"{BASE_URL}/api/genericplants")
if gp_response.status_code != 201:
    print("Failed to get generic plants:", gp_response.text)
    exit()

generic_plants = gp_response.json()
first_gp = generic_plants[0]
generic_plant_id = first_gp["_id"]
print("Got first generic plant:", generic_plant_id)
print()

# 3. Create custom plant
custom_plant_payload = {
    "genericPlant": generic_plant_id,
    "name": "Money Tree",
    "imageUrl": "www.example.com",
    "potVolume": 3,
    "requiredWater": 0.5
}

cp_response = session.post(f"{BASE_URL}/api/customplants", json=custom_plant_payload)
if cp_response.status_code != 201:
    print("Failed to create custom plant:", cp_response.text)
    exit()

custom_plant = cp_response.json()
custom_plant_id = custom_plant["_id"]
print("Created custom plant:", custom_plant_id)
print()

# 4. Setup SocketIO client
sio = socketio.Client()

@sio.event
def connect():
    print('Connected to the server')

    sio.emit("join_room", custom_plant_id)
    print(f"Joined room: {custom_plant_id}")

    example_metric = {
        "customPlantId": custom_plant_id,
        "dateTimeStamp": datetime.datetime.now().isoformat(),
        "moistureLevel": 42,
        "waterLevel": "medium",
        "lastWatered": datetime.datetime.now().isoformat()
    }

    sio.emit('send_metric', {'roomId': custom_plant_id, 'entity': example_metric})
    print("Sent metric:", example_metric)
    print()

@sio.event
def metric_new_data(data):
    print("New received metric:", data)

@sio.event
def connect_error(data):
    print("Connection error:", data)

@sio.event
def disconnect():
    print("Disconnected from the server")

sio.connect(BASE_URL)
time.sleep(5)
sio.disconnect()