#include <dht11.h>

#include <SPI.h>
#include <WiFi.h>


#include <ArduinoMqttClient.h>
#include <Arduino_JSON.h>

#define DHT11PIN 7

const char* ssid = "Harsh Pixel";
const char* pass ="12345678"; 
int status = WL_IDLE_STATUS;     // the WiFi radio's status

const char* mqtt_server = "192.168.192.239";
WiFiClient espClient;
//PubSubClient client(espClient);
//create the objects
WiFiClient wifiClient;
MqttClient mqttClient(wifiClient);


int        port     = 1883;


dht11 DHT11;

const int buzzerPin = 3;
const int LED_PIN_GREEN = 4;
const int LED_PIN_YELLOW = 5;
const int LED_PIN_RED = 6;
const int flameSensorPin = A0;
const int flameDigitalPin = 8;
const int sensorMin = 0;
const int sensorMax = 1024;
unsigned long previousMillis =0;
const long interval = 120000;
int id = 23;



void printWifiData() {
  // print your board's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);
  Serial.println(ip);

  // print your MAC address:
  byte mac[6];
  WiFi.macAddress(mac);
  Serial.print("MAC address: ");
  printMacAddress(mac);
}

void printCurrentNet() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print the MAC address of the router you're attached to:
  byte bssid[6];
  WiFi.BSSID(bssid);
  Serial.print("BSSID: ");
  printMacAddress(bssid);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.println(rssi);

  // print the encryption type:
  byte encryption = WiFi.encryptionType();
  Serial.print("Encryption Type:");
  Serial.println(encryption, HEX);
  Serial.println();
}

void printMacAddress(byte mac[]) {
  for (int i = 5; i >= 0; i--) {
    if (mac[i] < 16) {
      Serial.print("0");
    }
    Serial.print(mac[i], HEX);
    if (i > 0) {
      Serial.print(":");
    }
  }
  Serial.println();
}



void setup(){
  Serial.begin(9600);
  delay(1000);
 
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }
Serial.println("start wifi connection");
  // check for the WiFi module:
  if (WiFi.status() == WL_NO_MODULE) {
    Serial.println("Communication with WiFi module failed!");
    // don't continue
    while (true);
  }

  // attempt to connect to WiFi network:
  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to WPA SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network:
    status = WiFi.begin(ssid, pass);
   Serial.print(".");
    // wait 10 seconds for connection:
    delay(1000);
  }

  // you're connected now, so print out the data:
  Serial.print("You're connected to the network");


  Serial.println();

  Serial.print("Attempting to connect to the MQTT broker: ");
  Serial.println(mqtt_server);

  if (!mqttClient.connect(mqtt_server, port)) {
    Serial.print("MQTT connection failed! Error code = ");
    Serial.println(mqttClient.connectError());

    while (1);
  }

  Serial.println("You're connected to the MQTT broker!");
  Serial.println();

  mqttClient.beginMessage("hello");
    mqttClient.print("world");
    mqttClient.endMessage();


  //create JSON Object

 

  // set the message receive callback
  //mqttClient.onMessage(onMqttMessage);

 pinMode(buzzerPin, OUTPUT); 
 pinMode(LED_PIN_GREEN, OUTPUT);
 //digitalWrite(LED_PIN_GREEN, HIGH);

 pinMode(LED_PIN_YELLOW, OUTPUT);
 //digitalWrite(LED_PIN_YELLOW, HIGH);

 pinMode(LED_PIN_RED, OUTPUT);
 //digitalWrite(LED_PIN_RED, HIGH);
 pinMode(flameDigitalPin, INPUT);

 

}

void loop(){
JSONVar messageObject;

Serial.println("loop.");
  unsigned long currentMillis = millis();
  unsigned long elapsedTime = currentMillis - previousMillis;

  /*
  if (!client.connected()) {
        // Reconnect to MQTT
    while (!client.connect("arduinoClient")) {
        Serial.print(".");
        delay(5000);
      }
  }
  client.loop();
  delay(1000);
*/
  int chk = DHT11.read(DHT11PIN);

  Serial.print("Humidity (%): ");
  Serial.println((float)DHT11.humidity, 2);

//create JSON Object
  messageObject["Humidity"] =String((float)DHT11.humidity);

  Serial.print("Temperature  (C): ");
  Serial.println((float)DHT11.temperature, 2);

  messageObject["Temperature"] =String((float)DHT11.temperature);

  Serial.println("Station ID: ");
  messageObject["Station"] = String(id);

  
 





 
  int analogValue = analogRead(flameSensorPin);
  //int analogValue = 804;
  Serial.println(analogValue);

  messageObject["FlameSensor"] =String(analogValue);
   String message = JSON.stringify(messageObject);

  mqttClient.beginMessage("SENSORS");
  mqttClient.print(message);
  mqttClient.endMessage();


  Serial.print("JSON.stringify(message) = ");
  Serial.println(message);
  Serial.println();






  //analog
  if((analogValue>804)&&(analogValue<1022)){
    digitalWrite(LED_PIN_YELLOW, HIGH);
    Serial.println("Flame nearby");
    digitalWrite(LED_PIN_RED, LOW);
    digitalWrite(LED_PIN_GREEN, LOW); 
    digitalWrite(LED_PIN_YELLOW, HIGH);

  }else if(analogValue < 1023){
    Serial.println("Flame detected(analog)");
    digitalWrite(LED_PIN_RED, HIGH);
    digitalWrite(LED_PIN_GREEN,LOW);
    digitalWrite(LED_PIN_YELLOW,LOW);
    if (elapsedTime <= interval) {
    // Within the 2-minute interval, do your actions
      //Serial.println("sound");
      tone(buzzerPin, 1000);
      delay(5000);
      //Serial.println("no sound");
      noTone(buzzerPin);
      delay(2000);
      Serial.println(elapsedTime);
    } else {
    // 2 minutes have passed, reset the timer
      previousMillis = currentMillis;
    
      
    }
    
    

  }else if (analogValue >= 804){
    noTone(buzzerPin);
    Serial.println("No flame detected");
    digitalWrite(LED_PIN_GREEN,HIGH);
    digitalWrite(LED_PIN_RED,LOW);
    digitalWrite(LED_PIN_YELLOW,LOW);
    

  }

  delay(1000);

  
}


