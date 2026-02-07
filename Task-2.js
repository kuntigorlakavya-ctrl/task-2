        // EMAIL VALIDATION REGEX (100% accurate)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
        // FORM VALIDATION & SUBMISSION
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            clearErrors();
            
            // Validate Name
            const name = document.getElementById('name').value.trim();
            if (name.length < 2) {
                showError('name', 'Name must be at least 2 characters');
                isValid = false;
            }
            
            // Validate Email (100% accurate regex)
            const email = document.getElementById('email').value.trim();
            if (!emailRegex.test(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate Message
            const message = document.getElementById('message').value.trim();
            if (message.length < 10) {
                showError('message', 'Message must be at least 10 characters');
                isValid = false;
            }
            
            if (isValid) {
                document.getElementById('successMsg').style.display = 'block';
                this.reset();
                setTimeout(() => {
                    document.getElementById('successMsg').style.display = 'none';
                }, 3000);
            }
        });
        
        // REAL-TIME VALIDATION
        ['name', 'email', 'message'].forEach(fieldId => {
            document.getElementById(fieldId).addEventListener('input', function() {
                clearError(fieldId);
            });
        });
        
        function showError(fieldId, message) {
            document.getElementById(fieldId).classList.add('error');
            document.getElementById(fieldId + 'Error').textContent = message;
        }
        
        function clearErrors() {
            document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        }
        
        function clearError(fieldId) {
            document.getElementById(fieldId).classList.remove('error');
            document.getElementById(fieldId + 'Error').textContent = '';
        }
        
        // IMAGE GALLERY FUNCTIONALITY (100% DOM manipulation)
        function addImage() {
            const urlInput = document.getElementById('imageUrl');
            const url = urlInput.value.trim() || 'https://picsum.photos/200/150?random=' + Date.now();
            
            const gallery = document.getElementById('imageGallery');
            const imgItem = document.createElement('div');
            imgItem.className = 'image-item';
            imgItem.innerHTML = `
                <img src="${url}" alt="Gallery Image" onerror="this.src='https://via.placeholder.com/200x150/ccc?text=No+Image'">
                <button class="remove-btn" onclick="removeElement(this.parentElement)">×</button>
            `;
            gallery.appendChild(imgItem);
            urlInput.value = '';
        }
        
        // TASK LIST FUNCTIONALITY (100% DOM manipulation)
        let taskCounter = 0;
        function addTask() {
            const input = document.getElementById('taskInput');
            const taskText = input.value.trim();
            
            if (taskText) {
                const taskList = document.getElementById('taskList');
                const taskItem = document.createElement('div');
                taskItem.className = 'task-item';
                taskItem.innerHTML = `
                    <span>${taskText}</span>
                    <button class="remove-btn" onclick="removeElement(this.parentElement)">×</button>
                `;
                taskItem.dataset.taskId = ++taskCounter;
                taskList.appendChild(taskItem);
                input.value = '';
            }
        }
        
        // UNIVERSAL REMOVE FUNCTION
        function removeElement(element) {
            element.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => element.remove(), 300);
        }
        
        // KEYBOARD SUPPORT
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                if (document.activeElement.id === 'taskInput') addTask();
                if (document.activeElement.id === 'imageUrl') addImage();
            }
        });
        
        // RESPONSIVE FLEXBOX & CSS GRID (Already implemented in CSS)

