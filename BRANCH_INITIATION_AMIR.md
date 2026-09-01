# 🚀 Branch Initiation & Backlog Overview — Amir Hemmatnia

## 📌 Projektkontext & Domänpitch
- **Grupp**: Grupp 6 (Maizer, r8_now, Amir Hemmatnia)
- **Domän**: Bokning av grupprum på ett bibliotek
- **Repository**: `https://github.com/Maizer89/grupp6-typescript`
- **Feature Branch**: `feature/booking-system-amir`

---

## 📋 Trello Backlog & User Stories (Cards 1–7)

1. **Card 1**: *Som besökare vill jag kunna se alla tillgängliga rum så att jag kan välja vilket rum jag vill boka.* (`/` — `<Home />`)
2. **Card 2**: *Som besökare vill jag kunna öppna ett specifikt rum så att jag kan se information om rummet innan jag bokar.* (`/rooms/:id` — `<RoomDetails />`)
3. **Card 3**: *Som besökare vill jag kunna välja datum, tidsblock och ange min e-postadress så att jag kan boka ett rum.* (`<BookingForm />`)
4. **Card 4**: *Som besökare vill jag få veta om ett rum redan är bokat under den valda tiden så att två personer inte kan boka samma rum samtidigt.* (`isRoomAvailable` validering)
5. **Card 5**: *Som besökare vill jag kunna söka efter bokningar med min e-postadress så att jag kan se mina bokningar.* (`/my-bookings` — `<MyBookings />`)
6. **Card 6**: *Som besökare vill jag kunna avboka en bokning så att rummet inte längre är reserverat av mig.* (`cancelBooking`)
7. **Card 7**: *Som besökare vill jag få tydliga meddelanden när en bokning lyckas eller misslyckas så att jag vet vad som har hänt.* (Toast / Alert Notifikationer)

---

## 💻 Verkställda Git-Kommandon (Executed Branch Setup Commands)

Följande kommandon kördes i terminalen för att initiera branchen och koppla den till GitHub:

```bash
# 1. Navigera till gruppprojektet
cd /home/deb88/Documents/jobs_refs/Front-end-developer/10.typescript/grupp6-typescript

# 2. Skapa och växla till min feature-branch
git checkout -b feature/booking-system-amir

# 3. Stega alla nya dokumentationsfiler
git add .

# 4. Skapa en initierings-commit
git commit -m "docs: lägg till gren-initiering och backlog-översikt — Amir"

# 5. Pusha branchen till GitHub
git push -u origin feature/booking-system-amir
```

---
*Initierat av Amir Hemmatnia — September 2026*
