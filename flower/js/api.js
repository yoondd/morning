const fetchWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0f347a891b27262bf15023a506af4bbe`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
 
      // 날씨 아이콘.
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      const weatherIconElement = document.getElementById('weatherIcon');
      weatherIconElement.src = iconUrl;
 
      // 온도.
      const temp = data.main.temp;
      const temp_Element = document.getElementById('temp');
      temp_Element.textContent = `${temp}°C`;

      // 날씨 컨디션. 
      const weatherCondition = data.weather[0].main; 
      const conditionElement = document.getElementById('condition');
      conditionElement.textContent = weatherCondition;
      
    } catch (error) {
      console.error(error.message);
    }
  };
  
  // 사용 예시
  fetchWeather('Suwon');
  