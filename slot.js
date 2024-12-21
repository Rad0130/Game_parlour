const calendar = document.getElementById('calendar');
        const currentMonthElement = document.getElementById('currentMonth');
        const prevMonthButton = document.getElementById('prevMonth');
        const nextMonthButton = document.getElementById('nextMonth');
        const slotsContainer = document.getElementById('slots');
        const confirmBtn = document.getElementById('confirmBtn');
        let selectedDate = null;
        let selectedSlot = null;

        const today = new Date();
        let currentYear = today.getFullYear();
        let currentMonth = today.getMonth();

        // Mock data: booked slots
        const bookedSlots = {
            "2024-12-20": ["10:00 AM", "12:00 PM"],
            "2024-12-21": ["11:00 AM"],
        };

        const generateCalendar = (year, month) => {
            calendar.innerHTML = '';
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            currentMonthElement.textContent = new Date(year, month).toLocaleString('default', {
                month: 'long',
                year: 'numeric'
            });

            // Add empty days for padding
            for (let i = 0; i < firstDay; i++) {
                const emptyDiv = document.createElement('div');
                calendar.appendChild(emptyDiv);
            }

            // Add days of the month
            for (let day = 1; day <= daysInMonth; day++) {
                const date = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                const dayDiv = document.createElement('div');
                dayDiv.className = 'day';
                dayDiv.textContent = day;
                dayDiv.dataset.date = date;

                if (bookedSlots[date]) {
                    dayDiv.classList.add('booked');
                } else {
                    dayDiv.addEventListener('click', () => selectDate(date));
                }

                calendar.appendChild(dayDiv);
            }
        };

        const selectDate = (date) => {
            selectedDate = date;
            document.querySelectorAll('.day').forEach(day => day.classList.remove('selected'));
            document.querySelector(`[data-date='${date}']`).classList.add('selected');
            showSlots(date);
        };

        const showSlots = (date) => {
            slotsContainer.style.display = "block";
            slotsContainer.innerHTML = `<h3>Available Slots for ${date}</h3>`;
            const slots = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM"];
            slots.forEach(slot => {
                const slotDiv = document.createElement('div');
                slotDiv.className = 'slot';
                slotDiv.textContent = slot;
                if (bookedSlots[date]?.includes(slot)) {
                    slotDiv.classList.add('booked');
                } else {
                    slotDiv.addEventListener('click', () => selectSlot(slotDiv, slot));
                }
                slotsContainer.appendChild(slotDiv);
            });
        };

        const selectSlot = (slotDiv, slot) => {
            selectedSlot = slot;
            document.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
            slotDiv.classList.add('selected');
            confirmBtn.style.display = "block";
        };

        confirmBtn.addEventListener('click', () => {
            if (selectedDate && selectedSlot) {
                alert(`Booking confirmed for ${selectedDate} at ${selectedSlot}!`);
                location.reload();
            }
        });

        prevMonthButton.addEventListener('click', () => {
            currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
            currentYear = currentMonth === 11 ? currentYear - 1 : currentYear;
            generateCalendar(currentYear, currentMonth);
        });

        nextMonthButton.addEventListener('click', () => {
            currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
            currentYear = currentMonth === 0 ? currentYear + 1 : currentYear;
            generateCalendar(currentYear, currentMonth);
        });

        generateCalendar(currentYear, currentMonth);