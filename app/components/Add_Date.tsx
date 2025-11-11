"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";

type FormValues = {
  day: number;
  month: number;
  year: number;
};

function calcAge(day: number, month: number, year: number) {
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  const d = new Date(year, month - 1, day);
  if (
    d.getFullYear() !== year ||
    d.getMonth() !== month - 1 ||
    d.getDate() !== day
  ) {
    if (month === 2 && day > 28) {
      alert(
        "Data inválida: O ano inserido não é bissexto ou o dia é inválido para fevereiro."
      );
    } else {
      alert("Data inválida: O dia inserido não existe para o mês selecionado.");
    }
  }

  return { years, months, days };
}

function Add_Date() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
  } | null>(null);

  const onSubmit = (data: FormValues) => {
    const { day, month, year } = data;
    if (
      !isNaN(day) &&
      !isNaN(month) &&
      !isNaN(year) &&
      day > 0 &&
      month > 0 &&
      year > 0
    ) {
      const age = calcAge(day, month, year);
      setResult(age);
    }
  };

  return (
    <div className="relative bg-contain rounded-2xl rounded-br-[100px] md:rounded-br-[150px] bg-white shadow-xl w-full max-w-sm md:max-w-lg m-4 p-6 md:p-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-start justify-between md:justify-start md:space-x-4 border-b-2 border-gray-300 pb-12 md:pb-8 pr-0 md:pr-20">
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-400 mb-2 tracking-widest">
              DAY
            </label>
            <input
              type="number"
              placeholder="DD"
              {...register("day", {
                required: true,
                min: 1,
                max: 31,
                valueAsNumber: true,
              })}
              className="w-20 md:w-24 p-3 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500 text-center text-lg md:text-xl font-semibold"
            />
            {errors.day && (
              <span className="text-red-500 text-xs mt-1">Invalid day</span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-400 mb-2 tracking-widest">
              MONTH
            </label>
            <input
              type="number"
              placeholder="MM"
              {...register("month", {
                required: true,
                min: 1,
                max: 12,
                valueAsNumber: true,
              })}
              className="w-20 md:w-24 p-3 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500 text-center text-lg md:text-xl font-semibold"
            />
            {errors.month && (
              <span className="text-red-500 text-xs mt-1">Invalid month</span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-400 mb-2 tracking-widest">
              YEAR
            </label>
            <input
              type="number"
              placeholder="YYYY"
              {...register("year", {
                required: true,
                min: 0,
                max: new Date().getFullYear(),
                valueAsNumber: true,
              })}
              className="w-20 md:w-24 p-3 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500 text-center text-lg md:text-xl font-semibold"
            />
            {errors.year && (
              <span className="text-red-500 text-xs mt-1">Invalid year</span>
            )}
          </div>
        </div>
        <Button />
      </form>
      <div className="mt-16 md:mt-8">
        <div className="flex items-baseline">
          <span className="text-5xl md:text-6xl font-extrabold text-purple-600 mr-2 md:mr-4">
            {result ? result.years : "--"}
          </span>
          <span className="text-5xl md:text-6xl font-extrabold text-black">
            years
          </span>
        </div>
        <div className="flex items-baseline mt-1 md:mt-2">
          <span className="text-5xl md:text-6xl font-extrabold text-purple-600 mr-2 md:mr-4">
            {result ? result.months : "--"}
          </span>
          <span className="text-5xl md:text-6xl font-extrabold text-black">
            months
          </span>
        </div>
        <div className="flex items-baseline mt-1 md:mt-2">
          <span className="text-5xl md:text-6xl font-extrabold text-purple-600 mr-2 md:mr-4">
            {result ? result.days : "--"}
          </span>
          <span className="text-5xl md:text-6xl font-extrabold text-black">
            days
          </span>
        </div>
      </div>
    </div>
  );
}

export default Add_Date;
