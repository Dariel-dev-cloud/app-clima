import { z } from "zod";


const WeatherItem = z.object({
  id: z.number().int(),
  main: z.string(),
  description: z.string(),
  icon: z.string(),
}).strict();


const CurrentSchema = z.object({
  dt: z.number().int(),
  sunrise: z.number().int(),
  sunset: z.number().int(),
  temp: z.number(),
  feels_like: z.number(),
  pressure: z.number().int(),
  humidity: z.number().int(),
  dew_point: z.number(),
  uvi: z.number(),
  clouds: z.number().int(),
  visibility: z.number().int(),
  wind_speed: z.number(),
  wind_deg: z.number().int(),
  wind_gust: z.number().optional(),
  weather: z.array(WeatherItem),
}).strict();


const HourlyItem = z.object({
  dt: z.number().int(),
  temp: z.number(),
  feels_like: z.number(),
  pressure: z.number().int(),
  humidity: z.number().int(),
  dew_point: z.number(),
  uvi: z.number().optional(),     // a veces 0 o ausente de noche
  clouds: z.number().int(),
  visibility: z.number().int().optional(),
  wind_speed: z.number(),
  wind_deg: z.number().int(),
  wind_gust: z.number().optional(),
  weather: z.array(WeatherItem),
  pop: z.number().optional(),     // probabilidad de precipitación
}).strict();


const DailyItem = z.object({
  dt: z.number().int(),
  sunrise: z.number().int(),
  sunset: z.number().int(),
  moonrise: z.number().int().optional(),
  moonset: z.number().int().optional(),
  moon_phase: z.number(),
  summary: z.string().optional(),
  temp: z.object({
    day: z.number(),
    min: z.number(),
    max: z.number(),
    night: z.number(),
    eve: z.number(),
    morn: z.number(),
  }).strict(),
  feels_like: z.object({
    day: z.number(),
    night: z.number(),
    eve: z.number(),
    morn: z.number(),
  }).strict(),
  pressure: z.number().int(),
  humidity: z.number().int(),
  dew_point: z.number(),
  wind_speed: z.number(),
  wind_deg: z.number().int(),
  wind_gust: z.number().optional(),
  weather: z.array(WeatherItem),
  clouds: z.number().int(),
  pop: z.number().optional(),
  rain: z.number().optional(),
  uvi: z.number(),
}).strict();

/** esquema principal (sin minutely ni alerts) */
export const WeatherSchema = z.object({
  lat: z.number(),
  lon: z.number(),
  timezone: z.string(),
  timezone_offset: z.number().int(),
  current: CurrentSchema,
  hourly: z.array(HourlyItem),
  daily: z.array(DailyItem),
}).strict();

export type Weather = z.infer<typeof WeatherSchema>;

