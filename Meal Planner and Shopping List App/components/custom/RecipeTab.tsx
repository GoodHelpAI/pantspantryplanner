import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Book } from 'lucide-react';
import { Recipe } from '../../types';

interface RecipeTabProps {
    selectedRecipe: Recipe | null;
}

const RecipeTab = ({ selectedRecipe }: RecipeTabProps) => {
    return (
        <div className="mt-6">
            {selectedRecipe ? (
                <Card className="border-2 border-emerald-100 shadow-xl rounded-xl overflow-hidden">
                    <CardHeader className="border-b-2 border-emerald-100 bg-gradient-to-r from-emerald-50 to-green-50">
                        <CardTitle className="text-2xl font-bold text-emerald-800">{selectedRecipe.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-8 space-y-8">
                        <div>
                            <h4 className="font-bold text-gray-800 mb-6 flex items-center gap-3 text-lg">
                                <div className="w-2 h-8 bg-gradient-to-b from-emerald-400 to-green-500 rounded-full"></div>
                                🥗 Ingredients
                            </h4>
                            <div className="grid gap-3">
                                {selectedRecipe.ingredients.map((ingredient, index) => (
                                    <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 hover:shadow-md transition-all duration-200">
                                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-green-400 flex-shrink-0"></div>
                                        <span className="text-gray-700 font-medium">{ingredient}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 mb-6 flex items-center gap-3 text-lg">
                                <div className="w-2 h-8 bg-gradient-to-b from-sky-400 to-blue-500 rounded-full"></div>
                                👩‍🍳 Instructions
                            </h4>
                            <div className="p-6 rounded-xl bg-gradient-to-br from-sky-50 to-blue-50 border-2 border-sky-200 shadow-inner">
                                <p className="text-gray-700 leading-relaxed font-medium">{selectedRecipe.steps}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card className="border-2 border-emerald-100 shadow-xl rounded-xl">
                    <CardContent className="py-20 text-center">
                        <div className="space-y-6">
                            <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center mx-auto">
                                <Book className="h-12 w-12 text-emerald-500" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-emerald-800 mb-3">Recipe Collection</h3>
                                <p className="text-gray-600 text-lg">Select a meal from the "Meal Plan" tab to view its recipe.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default RecipeTab;
