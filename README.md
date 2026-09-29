# คลังคำ Finish the Word

เว็บ (PWA) สำหรับหาคำภาษาอังกฤษไว้เล่นเกม **Finish the Word** ใน Roblox: เกมต่อคำที่ต้องตอบคำที่ขึ้นต้นด้วยตัวอักษรสุดท้ายของคำก่อนหน้า

- คลังคำ 274,932 คำ (คำทั่วไป + ศัพท์เทคนิค) คำยอดนิยม 8,217 คำขึ้นก่อน
- ช่องค้นหาแนะนำคำขณะพิมพ์ · ค้นแบบขึ้นต้น / ลงท้าย / มีตัวนี้อยู่
- เรียงตามคำที่ใช้บ่อย, ความยาว หรือ "คำกับดัก" (ลงท้ายด้วยตัวที่คู่แข่งต่อยาก)
- ทำเครื่องหมายคำที่ใช้แล้วในรอบนี้ · เพิ่มคำเองได้ (เก็บในเบราว์เซอร์)
- ติดตั้งลงหน้าจอโฮมได้ (iPhone: Safari → แชร์ → เพิ่มไปยังหน้าจอโฮม) และใช้ได้แม้ไม่มีเน็ต

## ไฟล์

| ไฟล์ | หน้าที่ |
|---|---|
| `index.html` | หน้าเว็บทั้งหมด (HTML + CSS + JS ในไฟล์เดียว ไม่ต้อง build) |
| `words.txt` | คลังคำ: คำยอดนิยมเรียงตามความนิยม, บรรทัด `#`, แล้วตามด้วยคำทั้งหมด A→Z |
| `sw.js` | service worker เก็บหน้าเว็บและคลังคำไว้ใช้ offline |
| `manifest.webmanifest`, `icons/` | ข้อมูลแอป PWA และไอคอน |
| `vercel.json` | header ของ Vercel (ไม่ cache `sw.js`, content type ของ manifest) |

เมื่อแก้ `index.html` หรือ `words.txt` ให้เปลี่ยน `VERSION` ใน `sw.js` ด้วย เครื่องที่ติดตั้งไว้จะได้โหลดของใหม่

## Deploy บน Vercel

เป็นเว็บ static ล้วน: ใน Vercel กด **Add New → Project → Import** repo นี้ ตั้ง Framework Preset เป็น **Other** ไม่ต้องใส่ Build Command แล้วกด Deploy

## ทดสอบในเครื่อง

```sh
python3 -m http.server 8000   # แล้วเปิด http://localhost:8000
```

## ที่มาของคำ

คำทั้งหมดจาก [word-list](https://github.com/words/an-array-of-english-words) (MIT) ลำดับความนิยมจาก [google-10000-english](https://github.com/first20hours/google-10000-english) คำบางคำเกมอาจไม่รับ
