// ============================================================
// EDIT THIS FILE TO CONFIGURE FOR ANY COMPANY
// This is the only file you need to change per deployment
// ============================================================

export const companyConfig = {
  name: "Edge Conductor",
  tagline: "Embedded AI · Robotics · Industrial IoT — Real Intelligence on Real Hardware",
  description:
    "Edge Conductor is an embedded AI and robotics engineering company based in Indore, India. We design and build AI-powered systems that run on actual hardware — edge AI devices, autonomous robots, and industrial IoT solutions for global clients.",
  location: "Indore, Madhya Pradesh, India",
  serving: "Global clients (remote)",
  experience_years: 13,
  founded: 2013,

  contact: {
    email: "edgeconductor@gmail.com",
    website: "https://edgeconductor.com",
    phone: "+91-9522596713",
  },

  how_to_hire:
    "Email edgeconductor@gmail.com with your project description, target hardware, timeline, and budget. Response within 24 hours.",

  services: [
    {
      id: "edge_ai",
      name: "Edge AI Systems",
      description:
        "Computer vision and AI models running fully offline on embedded hardware. No cloud required.",
      use_cases: [
        "Defect detection on production lines",
        "People counting and occupancy monitoring",
        "Fall detection for hospitals",
        "Object tracking and recognition",
      ],
      hardware: ["Raspberry Pi", "Jetson Nano", "Jetson Orin"],
      skills: ["YOLOv8", "OpenCV", "TensorFlow Lite", "Python", "ONNX"],
    },
    {
      id: "robotics",
      name: "Autonomous Robotics",
      description:
        "ROS2-based autonomous robots with SLAM, LiDAR navigation, and intelligent path planning.",
      use_cases: [
        "Hospital patient monitoring robot",
        "Warehouse autonomous navigation",
        "Industrial inspection robots",
      ],
      hardware: ["Raspberry Pi", "LiDAR", "IMU", "Motor controllers"],
      skills: ["ROS2", "SLAM", "Nav2", "LiDAR", "Python", "C++"],
    },
    {
      id: "iot",
      name: "Industrial IoT",
      description:
        "Multi-network IoT devices with automatic WiFi → Ethernet → 4G GSM failover and real-time cloud dashboards.",
      use_cases: [
        "Factory sensor monitoring",
        "Water level control and automation",
        "Remote equipment tracking",
        "Energy monitoring",
      ],
      hardware: ["ESP32", "Arduino", "ATmega", "SIM800", "W5500"],
      skills: ["MQTT", "GSM", "Ethernet", "Node-RED", "Modbus", "RS485"],
    },
    {
      id: "firmware",
      name: "Embedded Firmware & PCB Design",
      description:
        "Custom firmware and PCB design for product companies. From prototype to production-ready hardware.",
      use_cases: [
        "Custom IoT device firmware",
        "Motor control systems",
        "RFID-based automation",
        "Payment-integrated dispensers",
      ],
      hardware: ["STM32", "ESP32", "AVR", "nRF52"],
      skills: ["C", "C++", "KiCad", "RS485", "SPI", "I2C", "UART"],
    },
  ],

  projects: [
    {
      id: "hospital-robot",
      category: "Edge AI · Robotics",
      title: "Hospital Edge AI Patient Monitoring Robot",
      description:
        "YOLOv8 fall detection, ROS2 autonomous navigation, RAG-based patient data retrieval, and Telegram nurse alerts — 100% offline on Raspberry Pi.",
      tags: ["YOLOv8", "ROS2", "Raspberry Pi", "LiDAR", "Ollama"],
    },
    {
      id: "iot-failover",
      category: "Industrial IoT",
      title: "Multi-Network IoT Device with Failover",
      description:
        "ESP32-based device with automatic WiFi → Ethernet → 4G GSM failover for uninterrupted industrial monitoring.",
      tags: ["ESP32", "GSM", "Ethernet", "WiFi", "MQTT"],
    },
    {
      id: "water-monitoring",
      category: "Industrial IoT",
      title: "Water Level Monitoring via GSM & MQTT",
      description:
        "Industrial IoT water level monitoring with GSM communication, MQTT dashboard, and bidirectional remote control.",
      tags: ["ATmega", "GSM", "MQTT", "ADS1115", "EEPROM"],
    },
    {
      id: "weighbridge",
      category: "Embedded Systems",
      title: "Truck Weighbridge Alignment & RFID System",
      description:
        "Automated weighbridge with UHF RFID vehicle detection, 6-sensor alignment checking, and RS485 communication.",
      tags: ["ESP32", "RFID", "RS485", "Relay", "Industrial"],
    },
    {
      id: "water-dispenser",
      category: "IoT · Payments",
      title: "Smart QR-Based Water Dispenser",
      description:
        "QR code payment via Razorpay, webhook-to-MQTT pipeline, automated dispensing with pH and turbidity monitoring.",
      tags: ["ESP32", "Razorpay", "MQTT", "pH Sensor", "Webhook"],
    },
    {
      id: "lora-gps",
      category: "Communication Systems",
      title: "LoRa Long-Range GPS Tracking System",
      description:
        "Bidirectional LoRa messaging and GPS location sharing for no-network environments. Field-tested at 1km range.",
      tags: ["ESP32", "LoRa", "GPS", "Bluetooth", "PCB"],
    },
  ],
};
