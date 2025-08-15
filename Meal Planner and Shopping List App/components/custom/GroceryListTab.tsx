import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { CheckCircle } from 'lucide-react';
import { ShoppingListData } from '../../types';

interface GroceryListTabProps {
    shoppingListData: ShoppingListData;
    checkedItems: Set<string>;
    toggleItemCheck: (itemId: string) => void;
    createItemId: (category: string, item: string) => string;
}

const GroceryListTab = ({ shoppingListData, checkedItems, toggleItemCheck, createItemId }: GroceryListTabProps) => {
    const completedItemsCount = checkedItems.size;
    const totalItemsCount = Object.values(shoppingListData).flat().length;
    const completionPercentage = totalItemsCount > 0 ? Math.round((completedItemsCount / totalItemsCount) * 100) : 0;

    return (
        <div className="mt-6 space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 shadow-lg gap-4 sm:gap-0">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-amber-800 flex items-center gap-2">
                        🛒 Weekly Grocery List
                    </h2>
                    <p className="text-amber-700 font-medium mt-1 sm:mt-2 text-sm sm:text-base">
                        {completedItemsCount} of {totalItemsCount} items completed
                    </p>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                    <Badge
                        variant="secondary"
                        className="text-base sm:text-lg px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border border-amber-300 font-bold"
                    >
                        {completionPercentage}% Done
                    </Badge>
                    {completionPercentage === 100 && (
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                    )}
                </div>
            </div>

            {Object.entries(shoppingListData).map(([category, items], categoryIndex) => {
                const categoryColors = [
                    { bg: "from-sky-50 to-blue-50", border: "border-sky-200", text: "text-sky-800", accent: "bg-sky-400" },
                    { bg: "from-emerald-50 to-green-50", border: "border-emerald-200", text: "text-emerald-800", accent: "bg-emerald-400" },
                    { bg: "from-amber-50 to-orange-50", border: "border-amber-200", text: "text-amber-800", accent: "bg-amber-400" },
                    { bg: "from-rose-50 to-pink-50", border: "border-rose-200", text: "text-rose-800", accent: "bg-rose-400" },
                    { bg: "from-teal-50 to-cyan-50", border: "border-teal-200", text: "text-teal-800", accent: "bg-teal-400" }
                ];
                const colorScheme = categoryColors[categoryIndex % categoryColors.length];

                return (
                    <Card key={category} className={`border-2 ${colorScheme.border} shadow-lg rounded-xl overflow-hidden`}>
                        <CardHeader className={`border-b-2 ${colorScheme.border} bg-gradient-to-r ${colorScheme.bg} py-3 sm:py-4 px-4 sm:px-6`}>
                            <CardTitle className={`text-lg sm:text-xl font-bold ${colorScheme.text} flex items-center gap-2 sm:gap-3`}>
                                <div className={`w-2 h-6 sm:h-8 ${colorScheme.accent} rounded-full`}></div>
                                {category}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                            <div className="space-y-2">
                                {items.map((item, index) => {
                                    const itemId = createItemId(category, item);
                                    const isChecked = checkedItems.has(itemId);

                                    return (
                                        <div
                                            key={index}
                                            className={`flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl transition-all duration-200 ${isChecked
                                                    ? `bg-gradient-to-r ${colorScheme.bg} border-2 ${colorScheme.border}`
                                                    : 'hover:bg-gray-50 border-2 border-transparent'
                                                }`}
                                        >
                                            <Checkbox
                                                id={itemId}
                                                checked={isChecked}
                                                onCheckedChange={() => toggleItemCheck(itemId)}
                                                className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 h-4 w-4 sm:h-5 sm:w-5"
                                            />
                                            <label
                                                htmlFor={itemId}
                                                className={`flex-1 cursor-pointer transition-all duration-200 font-medium text-sm sm:text-base ${isChecked
                                                        ? 'line-through text-gray-400'
                                                        : 'text-gray-700 hover:text-gray-900'
                                                    }`}
                                            >
                                                {item}
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};

export default GroceryListTab;
