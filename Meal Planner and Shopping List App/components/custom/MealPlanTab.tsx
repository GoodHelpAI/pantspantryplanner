import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { ChevronRight, Sun, Clock, Moon, Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { MealData, Recipe } from '../../types';

const mealIcons = {
    Breakfast: Sun,
    Lunch: Clock,
    Dinner: Moon,
    Snack: Heart
};

const mealColors = {
    Breakfast: "text-amber-500",
    Lunch: "text-emerald-500",
    Dinner: "text-blue-500",
    Snack: "text-rose-500"
};

const mealBackgrounds = {
    Breakfast: "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200",
    Lunch: "bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200",
    Dinner: "bg-gradient-to-br from-blue-50 to-sky-50 border-blue-200",
    Snack: "bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200"
};

interface MealPlanTabProps {
    mealData: MealData;
    openDays: Set<string>;
    toggleDay: (day: string) => void;
    handleRecipeClick: (recipe: Recipe) => void;
}

const MealPlanTab = ({ mealData, openDays, toggleDay, handleRecipeClick }: MealPlanTabProps) => {
    return (
        <div className="mt-6 space-y-4">
            {Object.entries(mealData).map(([day, meals]) => (
                <Card key={day} className="overflow-hidden border-2 border-sky-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
                    <Collapsible
                        open={openDays.has(day)}
                        onOpenChange={() => toggleDay(day)}
                    >
                        <CollapsibleTrigger asChild>
                            <CardHeader className="cursor-pointer hover:bg-gradient-to-r hover:from-sky-50 hover:to-emerald-50 transition-all duration-300 border-b-2 border-sky-100 py-4 px-4 sm:px-6">
                                <CardTitle className="flex items-center justify-between text-lg sm:text-xl text-sky-800">
                                    <span className="font-bold text-left flex-1">{day}</span>
                                    <ChevronRight
                                        className={`h-5 w-5 sm:h-6 sm:w-6 text-sky-500 transition-transform duration-300 flex-shrink-0 ml-2 ${openDays.has(day) ? 'rotate-90' : ''
                                            }`}
                                    />
                                </CardTitle>
                            </CardHeader>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <CardContent className="pt-6 pb-6 space-y-4 px-4 sm:px-6">
                                {Object.entries(meals).map(([mealType, recipe]) => {
                                    const IconComponent = mealIcons[mealType as keyof typeof mealIcons];
                                    const colorClass = mealColors[mealType as keyof typeof mealColors];
                                    const backgroundClass = mealBackgrounds[mealType as keyof typeof mealBackgrounds];

                                    return (
                                        <div key={mealType} className={`flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl ${backgroundClass} shadow-sm hover:shadow-md transition-all duration-200`}>
                                            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                                                {IconComponent && <IconComponent className={`h-5 w-5 sm:h-6 sm:w-6 ${colorClass}`} />}
                                                <div className="min-w-0">
                                                    <span className="font-semibold text-gray-800 text-xs sm:text-sm whitespace-nowrap">{mealType}</span>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                className={`${colorClass} hover:bg-white/70 p-2 sm:p-3 h-auto font-semibold text-left min-w-0 flex-1 justify-start rounded-lg text-xs sm:text-sm`}
                                                onClick={() => handleRecipeClick(recipe)}
                                            >
                                                <span className="break-words text-wrap leading-tight">{recipe.name}</span>
                                            </Button>
                                        </div>
                                    );
                                })}
                            </CardContent>
                        </CollapsibleContent>
                    </Collapsible>
                </Card>
            ))}
        </div>
    );
};

export default MealPlanTab;
