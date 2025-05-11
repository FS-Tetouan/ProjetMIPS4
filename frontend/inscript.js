const signupForm = document.getElementById('signupForm');

if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userData = {
      firstname: signupForm.firstname.value,
      lastname: signupForm.lastname.value,
      email: signupForm.email.value,
      dob: signupForm.dob.value,
      gender: signupForm.gender.value,
      institution: signupForm.institution.value,
      department: signupForm.department.value,
      role: signupForm.role.value,
      password: signupForm.password.value
    };

    try {
      const res = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await res.text();      // ✅ استبدلنا res.json() بـ res.text()

      if (res.ok) {
        document.getElementById('message').innerText = "✅ " + data;
      } else {
        document.getElementById('message').innerText = "❌ " + data;
      }
    } catch (error) {
      document.getElementById('message').innerText = "❌ Error while signing up.";
      console.error(error);
    }
  });
}


