const OPEN_WEATHER_API_KEY = "c19fbcb5f85dee10051fb61f15499cb0";

export async function fetchOpenWeatherData() {
  const res = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${OPEN_WEATHER_API_KEY}`
  );

  if (!res.ok) {
    throw new Error("no city");
  }

  const data = await res.json();
  return data;
}
