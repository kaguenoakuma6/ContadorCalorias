import CalorieDisplay from "./CalorieDisplay";
import { useActivity } from "../hook/useActivity";



export default function CalorieTracker() {

    const { caloriesConusumed, caloriesBourned, netCalories } = useActivity();

  return (
    <>
        <h2 className="text-4xl font-black text-white text-center">Resumen de Calorias</h2>
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
            <CalorieDisplay
                calories={caloriesConusumed}
                text="Consumidas"
            />
            <CalorieDisplay
                calories={caloriesBourned}
                text="Quemadas"
            />
            <CalorieDisplay
                calories={netCalories}
                text="Diferencia"
            />

        </div>
    </>
  )
}
