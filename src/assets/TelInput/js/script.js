const input = document.querySelector("#phone");
      const iti = window.intlTelInput(input, {
        initialCountry: "us",
      });
      window.iti = iti; 