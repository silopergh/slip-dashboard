# 💸 Slip reader - Frontend

Frontend application สำหรับระบบวิเคราะห์สลิปโอนเงินด้วย AI
แสดงผลข้อมูลธุรกรรมแบบ real-time พร้อม dashboard และ visualization

---

## 🚀 Features

* 📤 Upload slip image
* 🖼️ Preview ก่อนอัปโหลด
* 🤖 เชื่อมต่อ backend AI processing
* 📊 Dashboard แสดงข้อมูลธุรกรรม
* 🥧 Pie Chart แสดงรายจ่ายตาม category
* 🌙 Dark / Light mode
* ⚡ Auto refresh หลัง upload

---

## 🧱 Tech Stack

* Next.js (App Router)
* React + TypeScript
* Tailwind CSS
* Recharts (data visualization)

---

## 📂 Project Structure

```
frontend/
 ├── app/
 │    └── page.tsx       # main dashboard
 ├── components/         # (optional)
 ├── public/
 ├── styles/
 ├── .gitignore
 └── package.json
```

---

## ⚙️ Installation

```bash
git clone <your-frontend-repo>
cd frontend
npm install
```

---

## ▶️ Run Project

```bash
npm run dev
```

เปิด:

```
http://localhost:3000
```

---

## 🔗 Backend Connection

Frontend เชื่อมต่อกับ backend:

```
http://localhost:5000/api/slip
```

---

## 📊 Features Overview

### 📤 Upload Flow

1. เลือกไฟล์ภาพ
2. preview รูป
3. upload ไป backend
4. AI วิเคราะห์ข้อมูล
5. แสดงผลใน dashboard

---

### 📈 Dashboard

* Total expense
* จำนวนรายการ
* ตารางธุรกรรม
* Pie chart ตาม category

---

## 🖼️ UI Highlights

* Modern SaaS-style dashboard
* Gradient upload section
* Responsive layout
* Dark mode support

---

## 📸 Demo

(ใส่ screenshot ของคุณที่นี่)

---

## 🔮 Future Improvements

* Drag & Drop upload
* Toast notification
* Authentication (login)
* Advanced analytics
* Export data (CSV / PDF)

---

## 👨‍💻 Author

Developed by Orpapan Yansan

---

## ⭐ Why this project?

โปรเจคนี้แสดงความสามารถในการ:

* พัฒนา frontend เชื่อม backend API
* ออกแบบ UI/UX แบบ modern
* ใช้ data visualization
* ทำ full-stack AI application

---
