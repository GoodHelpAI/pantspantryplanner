import React, { useState, useEffect } from 'react';
import { Calendar, Book, ShoppingCart, ChevronRight, Sun, Clock, Moon, Heart, CheckCircle } from 'lucide-react';
import { Button } from './components/ui/button';
import { Checkbox } from './components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './components/ui/collapsible';
import { Badge } from './components/ui/badge';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import pantsIconImage from 'figma:asset/8acb88e6bb539eb85e1b02887a395b57a800866a.png';
import faceImage from 'figma:asset/c42b736844d34f0525c41a8ffa7242930048c530.png';

// Pants Icon Component using Figma asset
const PantsIcon = () => (
  <ImageWithFallback 
    src={pantsIconImage} 
    alt="Pants Icon" 
    className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
  />
);

// Face Icon Component using Figma asset
const FaceIcon = () => (
  <ImageWithFallback 
    src={faceImage} 
    alt="Face" 
    className="w-full h-full object-cover rounded-full"
  />
);

// 100 Deep Thoughts-Style Compliments
const compliments = [
  "Your face is arranged in a way that I find very agreeable.",
  "Of all the people I know, you're one of them. My favorite one.",
  "I'm glad I married you. It makes figuring out dinner plans slightly easier.",
  "You're smarter than a lot of animals, and even some people I've met.",
  "Your laugh is nice. It's not like a clown's laugh, which can be scary.",
  "If we were both squirrels, I bet we'd have the best collection of acorns.",
  "Being with you is as pleasant as finding a perfectly smooth rock.",
  "I like your hair. It doesn't look like a wig, which is a big plus.",
  "We're a good team. We could probably solve a mystery, or at least get a good start.",
  "Your smile reminds me that not everything in the world wants to steal my sandwich.",
  "You're my favorite person to sit in a room with while we both look at our phones.",
  "I bet if you were a detective, you'd solve the case right before the credits.",
  "You have a good brain. I bet it makes all kinds of interesting thoughts.",
  "It's nice to have someone to blame when I can't find the remote. And it's you.",
  "I'm glad I found you, and not, say, a very clever bear in a hat.",
  "If life is a long, confusing journey, you're a pretty good navigator.",
  "You're as pretty as a picture, assuming the picture was painted by a good artist.",
  "I like your clothes. They do a good job of covering your skeleton.",
  "Holding your hand is nice. It's better than holding a wet frog.",
  "I bet you could teach a cat to do its taxes. But you don't, which is humble.",
  "When you're not around, the room is definitely emptier. And quieter.",
  "You have nice eyes. They look like they're good for seeing things.",
  "I like sharing a pizza with you, even though it means less pizza for me.",
  "You're so great, I bet a flock of birds would spell out your name. If they could.",
  "Sometimes I think of you and I forget where I put my keys. But it's a nice thought.",
  "You're the kind of person who would probably survive a zombie apocalypse.",
  "When you talk, I listen. Most of the time.",
  "We fit together well, like two puzzle pieces that someone hasn't chewed on.",
  "You're so kind, you'd probably apologize to a chair you bumped into.",
  "Our home is my favorite place, mostly because you're in it. And my stuff.",
  "I'm glad it's you I see every morning, and not a ghost.",
  "You're probably smart enough to build a robot. I hope you don't.",
  "I bet if you were a tree, you'd be one that's easy to climb.",
  "Your opinions are interesting, even the ones that are wrong.",
  "It's nice waking up next to you. It's a good way to know the night is over.",
  "You're more fun than a barrel of monkeys, and probably less messy.",
  "If you were a superhero, your power would be making things less annoying.",
  "I like walking with you. It feels like we're going somewhere, together.",
  "You smell nice. Not like a new car, but in a good, human way.",
  "I trust your judgment, especially when it comes to picking out snacks.",
  "If you were a cloud, you'd be one of the fluffy, non-rainy ones.",
  "You're my best friend. Which is convenient, since we live together.",
  "I love you more than a dog loves looking out a car window.",
  "You're so organized. I bet you know where all the batteries are.",
  "When I think of my favorite person, your name usually pops up first.",
  "Your hugs are very effective at being hugs.",
  "I'd rather be bored with you than have fun with almost anyone else.",
  "You're a wonderful person, and I'm not just saying that to get you to pass the salt.",
  "If our life was a movie, I think we'd get pretty good reviews.",
  "You're the kind of person I'd share my emergency chocolate with.",
  "I like how you're always you, and not some kind of secret agent.",
  "You're so great, sometimes I think you must be a government secret.",
  "My life was fine before. But with you, it's fine and also has you in it.",
  "I'm glad we like a lot of the same TV shows. It prevents arguments.",
  "You're my number one. Out of all the people I've numbered.",
  "Your voice is pleasant. It doesn't make me want to put on headphones.",
  "If there was a trophy for being a good wife, I would buy it for you.",
  "When you fall asleep, you don't sound like a monster, which is considerate.",
  "I like your hands. They're good for holding and also for pointing at things.",
  "You're a real treasure. Hopefully, one that pirates won't find.",
  "I think you're neat. Like a well-preserved dinosaur bone.",
  "You're the best part of my day, besides maybe lunch. It's close.",
  "If I was a captain, you'd be my first mate. Or maybe the funny parrot.",
  "I'm glad my weirdness and your weirdness decided to hang out.",
  "You're the kind of person who probably remembers to water plants.",
  "I love you enough to kill a spider for you. A small one.",
  "Your taste in things is pretty good, because you chose me.",
  "When you're excited, it's like watching a puppy discover a leaf.",
  "You're my favorite person to get stuck in traffic with.",
  "I bet you'd be good at naming horses.",
  "If I had to be locked in a room with one person, I'd pick you.",
  "You're a real gem. Not a cursed one, I don't think.",
  "I like how you never seem to run out of things to say.",
  "Sometimes I wonder how you do it all. Then I get distracted.",
  "Marrying you was a great idea. Probably in my top five ideas.",
  "You make me want to be a better person. Or at least, a person who showers more.",
  "I'm glad we're on the same planet at the same time.",
  "If you were a song, you'd be one I wouldn't mind getting stuck in my head.",
  "You have a very high success rate of being you.",
  "It's funny that out of everyone, we found each other. Funny and also lucky.",
  "You're my favorite person to watch a movie with, even when you ask questions.",
  "I bet animals like you. They can probably sense your good snacks.",
  "You're so lovely, you make me forget about the impending heat death of the universe.",
  "Our conversations are my favorite. They're better than most podcasts.",
  "If you were a flavor of ice cream, you'd be a good one, not like \"rum raisin.\"",
  "I'm glad you exist. The world is a lot less boring this way.",
  "You're so cool, you probably don't even get brain freeze.",
  "I think you're what people mean when they say \"the good life.\"",
  "You're the reason I look at my phone and smile. And not just at memes.",
  "I trust you to tell me if I have food in my teeth. That's real love.",
  "If my heart was a boat, you would be the anchor. A nice, non-rusty anchor.",
  "I'm happy you're here. Otherwise, I'd have to tell my jokes to the wall.",
  "You're as essential as coffee. And I really, really like coffee.",
  "I'm pretty sure you're the best person. I haven't checked with everyone, but I'm sure.",
  "You're like a comfortable chair for my soul.",
  "I'd give you my last chicken nugget. Probably.",
  "Being your husband is a pretty good gig. I'd recommend it.",
  "You're the one I think of when I hear a good love song on the radio.",
  "I hope we get to be old together and complain about things.",
  "I love you. It's a weird feeling, but I like it."
];

// Types
interface Recipe {
  name: string;
  ingredients: string[];
  steps: string;
}

interface MealData {
  [day: string]: {
    [mealType: string]: Recipe;
  };
}

interface ShoppingListData {
  [category: string]: string[];
}

// Data
const mealData: MealData = {
  "Monday": {
    "Breakfast": { 
      name: "Greek Yogurt Power Bowl", 
      ingredients: ["1 cup plain Greek yogurt (full-fat or 2% recommended)", "1 tbsp chia seeds", "1/2 cup fresh blueberries, rinsed", "1-2 tsp honey or maple syrup"], 
      steps: "Scoop the Greek yogurt into a bowl. Sprinkle the chia seeds evenly over the top. Add the fresh blueberries. Drizzle with honey or maple syrup just before serving. Chef's Tip: For a creamier texture and to soften the chia seeds, stir them into the yogurt and let it sit for 5 minutes before adding the other toppings." 
    },
    "Lunch": { 
      name: "Refreshing Chickpea & Herb Salad", 
      ingredients: ["1 (15-ounce) can chickpeas, rinsed and drained", "1/2 English cucumber, diced", "1 Roma tomato, diced", "1/4 red onion, finely diced", "2 tbsp extra virgin olive oil", "1 tbsp fresh lemon juice", "1/4 tsp salt", "1/8 tsp freshly ground black pepper"], 
      steps: "In a medium bowl, combine the rinsed chickpeas, diced cucumber, tomato, and red onion. In a separate small bowl or jar, whisk together the olive oil, lemon juice, salt, and pepper to create the dressing. Pour the dressing over the chickpea mixture and toss gently to combine. For best results, cover and refrigerate for at least 15 minutes to allow the flavors to marry." 
    },
    "Dinner": { 
      name: "Sheet Pan Lemon-Herb Chicken with Roasted Vegetables & Quinoa", 
      ingredients: ["2 (6-ounce) boneless, skinless chicken breasts", "1 medium zucchini, cut into 1-inch pieces", "1 large red bell pepper, cut into 1-inch pieces", "2 tbsp olive oil", "1 tsp dried oregano", "1/2 tsp garlic powder", "Salt and freshly ground black pepper to taste", "1/2 cup uncooked quinoa", "1 cup water or broth"], 
      steps: "Prepare Quinoa: Rinse the quinoa under cold water. In a small saucepan, bring 1 cup of water or broth to a boil. Add the quinoa, reduce heat to low, cover, and simmer for 15 minutes or until the liquid is absorbed. Fluff with a fork. Prepare Chicken & Veggies: Preheat your oven to 400°F (200°C). On a large, rimmed baking sheet, place the chicken breasts and surround them with the chopped zucchini and bell pepper. Season: Drizzle everything with olive oil. Sprinkle evenly with oregano, garlic powder, salt, and pepper. Use your hands or tongs to toss everything together until well-coated. Spread into a single layer. Roast: Bake for 20-25 minutes, or until the chicken is cooked through (internal temperature reaches 165°F or 74°C) and the vegetables are tender and slightly caramelized at the edges. Serve the chicken and vegetables over a bed of the cooked quinoa." 
    },
    "Snack": { 
      name: "Apple with Sunflower Seed Butter", 
      ingredients: ["1 apple", "2 tablespoons sunflower seed butter"], 
      steps: "Slice one apple and serve with 2 tablespoons of sunflower seed butter for dipping." 
    }
  },
  "Tuesday": {
    "Breakfast": { 
      name: "Strawberry Cinnamon Overnight Oats", 
      ingredients: ["1/2 cup rolled oats", "1/2 cup oat milk (or milk of choice)", "1 tbsp ground flaxseed", "1/2 cup fresh strawberries, sliced or chopped", "1/4 tsp ground cinnamon", "Optional: 1 tsp maple syrup for sweetness"], 
      steps: "In a jar or container with a lid, combine the rolled oats, oat milk, ground flaxseed, and cinnamon. Add maple syrup if using. Stir or shake well until everything is combined. Gently stir in the sliced strawberries. Cover and refrigerate for at least 4 hours, or preferably overnight. Enjoy cold, or microwave for 60-90 seconds for a warm breakfast." 
    },
    "Lunch": { 
      name: "Hearty Lentil Soup", 
      ingredients: ["1 tbsp olive oil", "1 small onion, finely chopped", "1 medium carrot, finely chopped", "1 celery stalk, finely chopped", "2 cloves garlic, minced", "1 cup brown or green lentils, rinsed", "4 cups vegetable or chicken broth", "1 tsp dried thyme or Italian herbs", "Salt and pepper to taste"], 
      steps: "Heat olive oil in a medium pot or Dutch oven over medium heat. Add the onion, carrot, and celery (this trio is known as a mirepoix). Sauté for 5-7 minutes, until softened. Add the minced garlic and cook for another minute until fragrant. Add the rinsed lentils, broth, and dried herbs. Bring to a boil. Reduce the heat to a simmer, cover, and cook for 25-30 minutes, or until the lentils are tender. Season generously with salt and pepper to taste." 
    },
    "Dinner": { 
      name: "Turkey Meatballs with Marinara, Pasta & Steamed Broccoli", 
      ingredients: ["1 lb ground turkey", "1/2 cup breadcrumbs (panko or regular)", "1 large egg, lightly beaten", "2 cloves garlic, minced", "1 tsp Italian herbs", "1/2 tsp salt", "1/4 tsp black pepper", "8 oz pasta of your choice (e.g., spaghetti, penne)", "2 cups broccoli florets", "1.5 cups marinara sauce, warmed"], 
      steps: "Preheat oven to 400°F (200°C). Line a baking sheet with parchment paper. In a large bowl, combine the ground turkey, breadcrumbs, beaten egg, minced garlic, Italian herbs, salt, and pepper. Mix gently with your hands until just combined—do not overmix. Roll the mixture into 1- to 1.5-inch meatballs and place them on the prepared baking sheet. Bake for 15-20 minutes, or until cooked through and lightly browned. While meatballs bake, cook pasta according to package directions. In the last 3-4 minutes of cooking, add the broccoli florets to the pasta water to steam them. Drain the pasta and broccoli. Serve the pasta and broccoli topped with the warm marinara sauce and turkey meatballs." 
    },
    "Snack": { 
      name: "Hummus with Veggie Sticks", 
      ingredients: ["1/4 cup hummus", "Carrot sticks", "Celery sticks"], 
      steps: "Serve 1/4 cup of hummus with a handful of carrot and celery sticks." 
    }
  },
  "Wednesday": {
    "Breakfast": { 
      name: "Spinach & Feta Scrambled Eggs", 
      ingredients: ["3 large eggs", "1 tbsp milk or water", "Salt and pepper to taste", "1 tsp olive oil or butter", "1 large handful of fresh spinach (about 1-2 cups)", "2 tbsp crumbled feta cheese"], 
      steps: "In a bowl, whisk the eggs with milk or water, salt, and pepper until light and frothy. Heat oil or butter in a non-stick skillet over medium heat. Add the spinach and cook for 1-2 minutes until it wilts. Pour the egg mixture over the spinach. Cook, stirring gently with a spatula, until the eggs are cooked to your desired doneness. Remove from heat and sprinkle with crumbled feta cheese before serving." 
    },
    "Lunch": { 
      name: "Greek Salad with White Beans", 
      ingredients: ["2 cups chopped romaine lettuce or mixed greens", "1/2 cup canned white beans (cannellini or navy), rinsed and drained", "1/2 cucumber, sliced", "1/2 cup cherry tomatoes, halved", "1/4 cup Kalamata olives", "2 tbsp crumbled feta cheese", "1 tbsp olive oil", "2 tsp lemon juice", "pinch of dried oregano"], 
      steps: "In a large bowl, combine the lettuce, white beans, cucumber, cherry tomatoes, and olives. In a small bowl, whisk together the olive oil, lemon juice, and oregano for the dressing. Pour the dressing over the salad and toss to combine. Top with crumbled feta cheese before serving." 
    },
    "Dinner": { 
      name: "Roasted Chicken Thighs with Sweet Potatoes & Brussels Sprouts", 
      ingredients: ["4 boneless, skinless chicken thighs (about 1 lb)", "1 large sweet potato, peeled and cut into 1-inch cubes", "1.5 cups Brussels sprouts, trimmed and halved", "2 tbsp olive oil", "1 tsp paprika (smoked paprika is excellent here)", "1 tsp garlic powder", "Salt and pepper to taste"], 
      steps: "Preheat oven to 400°F (200°C). On a large, rimmed baking sheet, combine the cubed sweet potato and halved Brussels sprouts. Drizzle with 1 tbsp of olive oil and season with salt and pepper. Toss to coat and spread in an even layer. In a separate bowl, pat the chicken thighs dry. Toss them with the remaining 1 tbsp olive oil, paprika, garlic powder, salt, and pepper. Place the seasoned chicken thighs amongst the vegetables on the baking sheet. Roast for 30-35 minutes, flipping the vegetables halfway through, until the chicken is cooked through and the vegetables are tender and caramelized." 
    },
    "Snack": { 
      name: "Grapes & Cheese", 
      ingredients: ["Handful of grapes", "Few slices of your favorite cheese (cheddar, provolone, etc.)"], 
      steps: "Serve a handful of grapes with a few slices of your favorite cheese." 
    }
  },
  "Thursday": {
    "Breakfast": { 
      name: "Berry Chia Smoothie", 
      ingredients: ["1 cup oat milk or other milk", "1 ripe banana (frozen for a thicker smoothie)", "1 cup mixed berries (frozen or fresh)", "1 tbsp chia seeds"], 
      steps: "Combine all ingredients in a blender. Blend on high until completely smooth and creamy. Pour into a glass and enjoy immediately. Chef's Tip: Using frozen fruit (both banana and berries) eliminates the need for ice and creates an ultra-creamy, thick smoothie without watering down the flavor." 
    },
    "Lunch": { 
      name: "Quinoa Tabbouleh", 
      ingredients: ["1/2 cup uncooked quinoa, cooked and cooled", "1 cup fresh parsley, finely chopped", "1/2 cup fresh mint, finely chopped", "1 Roma tomato, finely diced", "1/2 cucumber, finely diced", "2 tbsp fresh lemon juice", "2 tbsp extra virgin olive oil", "Salt and pepper to taste"], 
      steps: "Cook the quinoa according to package directions and allow it to cool completely. In a medium bowl, combine the cooled quinoa, chopped parsley, mint, tomato, and cucumber. In a small bowl, whisk together the lemon juice, olive oil, salt, and pepper. Pour the dressing over the quinoa mixture and toss gently until everything is well combined." 
    },
    "Dinner": { 
      name: "Stuffed Bell Peppers", 
      ingredients: ["2 large bell peppers (any color), halved lengthwise and seeds removed", "1/2 lb ground turkey", "1/2 small onion, finely chopped", "2 cloves garlic, minced", "1 cup cooked rice or quinoa", "1/2 cup tomato sauce or marinara sauce", "1 tsp Italian herbs", "Salt and pepper to taste", "Optional: 1/4 cup shredded mozzarella or Parmesan cheese for topping"], 
      steps: "Preheat oven to 375°F (190°C). In a skillet over medium-high heat, cook the ground turkey with the chopped onion until the turkey is no longer pink. Add the garlic and cook for one more minute. Drain any excess fat. Remove the skillet from the heat. Stir in the cooked rice, tomato sauce, Italian herbs, salt, and pepper. Arrange the bell pepper halves in a baking dish, cut-side up. Spoon the turkey and rice mixture evenly into the pepper halves. Pour a small amount of water (about 1/4 inch) into the bottom of the baking dish to help the peppers steam. Bake for 20-25 minutes. If using cheese, sprinkle it on top and bake for another 5 minutes, or until the peppers are tender and the cheese is melted and bubbly." 
    },
    "Snack": { 
      name: "Crispy Roasted Chickpeas", 
      ingredients: ["1 (15-ounce) can chickpeas, rinsed and drained", "1 tbsp olive oil", "1/2 tsp paprika", "1/4 tsp salt"], 
      steps: "Preheat oven to 400°F (200°C). The key to crispy chickpeas is to get them very dry. After rinsing and draining, pat them thoroughly dry with a paper towel or a clean kitchen towel. On a baking sheet, toss the dry chickpeas with olive oil, paprika, and salt until evenly coated. Roast for 20-25 minutes, shaking the pan halfway through, until they are golden brown and crispy. Let them cool slightly before eating; they will get crispier as they cool." 
    }
  },
  "Friday": {
    "Breakfast": { 
      name: "Cottage Cheese with Peaches & Cinnamon", 
      ingredients: ["1 cup cottage cheese", "1 ripe peach, sliced", "1/4 tsp ground cinnamon"], 
      steps: "Spoon the cottage cheese into a bowl. Top with fresh peach slices. Sprinkle with cinnamon and serve. Chef's Tip: Choose a full-fat cottage cheese for the richest flavor and creamiest texture." 
    },
    "Lunch": { 
      name: "Roasted Veggie & Hummus Wrap", 
      ingredients: ["1 large whole-grain tortilla or wrap", "3 tbsp hummus", "1 cup roasted vegetables (zucchini, bell peppers, onions are great)", "Handful of fresh spinach (optional)"], 
      steps: "If you need to roast vegetables: Toss chopped zucchini, peppers, and onions with olive oil, salt, and pepper. Roast at 400°F (200°C) for 20 minutes until tender. Warm the tortilla slightly in a dry pan or microwave to make it more pliable. Spread the hummus evenly over the surface of the tortilla. Layer the roasted vegetables (and spinach, if using) down the center. Fold in the sides of the tortilla and roll it up tightly." 
    },
    "Dinner": { 
      name: "Simple Baked Eggplant Parmesan", 
      ingredients: ["1 medium eggplant, sliced into 1/2-inch thick rounds", "2 tbsp olive oil", "Salt and pepper to taste", "1 cup marinara sauce", "1 cup shredded mozzarella cheese", "Optional: Fresh basil for garnish"], 
      steps: "Preheat oven to 400°F (200°C). Line a baking sheet with parchment paper. Arrange the eggplant slices in a single layer on the baking sheet. Brush both sides with olive oil and season with salt and pepper. Bake for 15-20 minutes, flipping once, until the eggplant is tender and golden. Remove from the oven. Top each eggplant slice with a spoonful of marinara sauce and a sprinkle of mozzarella cheese. Return to the oven for 5-10 more minutes, or until the cheese is melted and bubbly. Garnish with fresh basil before serving." 
    },
    "Snack": { 
      name: "Caprese Snack Skewers", 
      ingredients: ["Cherry tomatoes", "Fresh mozzarella balls (bocconcini)", "Extra virgin olive oil", "Fresh basil leaves"], 
      steps: "On small skewers, thread cherry tomatoes and fresh mozzarella balls (bocconcini). Drizzle with a tiny bit of extra virgin olive oil and garnish with a fresh basil leaf." 
    }
  },
  "Saturday": {
    "Breakfast": { 
      name: "Yogurt with Flaxseed & Raspberries", 
      ingredients: ["1 cup plain Greek yogurt", "1 tbsp ground flaxseed", "1/2 cup fresh raspberries", "1 tsp maple syrup"], 
      steps: "In a bowl, stir the ground flaxseed directly into the Greek yogurt. Top with fresh raspberries. Drizzle with maple syrup. Chef's Tip: Stirring the ground flaxseed into the yogurt (rather than just sprinkling it on top) ensures you get its benefits in every bite and improves the overall texture." 
    },
    "Lunch": { 
      name: "15-Minute White Bean & Kale Soup", 
      ingredients: ["1 tbsp olive oil", "1/2 onion, chopped", "2 cloves garlic, minced", "4 cups vegetable or chicken broth", "1 (15-ounce) can white beans (cannellini or navy), rinsed and drained", "2 large handfuls of kale, stems removed and leaves chopped", "Salt and pepper to taste", "Optional: Pinch of red pepper flakes"], 
      steps: "Heat olive oil in a pot over medium heat. Sauté the onion for 3-4 minutes until softened. Add the garlic and red pepper flakes (if using) and cook for another minute. Add the broth and bring to a simmer. Stir in the rinsed white beans and the chopped kale. Simmer for 10-15 minutes, or until the kale is tender. Season with salt and pepper to taste." 
    },
    "Dinner": { 
      name: "Grilled or Baked Chicken Skewers with Brown Rice", 
      ingredients: ["1 lb boneless, skinless chicken breast, cut into 1-inch cubes", "1 green bell pepper, cut into 1-inch pieces", "1/2 red onion, cut into 1-inch wedges", "2 tbsp olive oil", "1 tsp paprika", "1/2 tsp garlic powder", "Salt and pepper to taste", "1 cup uncooked brown rice", "2 cups water or broth", "4-6 wooden or metal skewers"], 
      steps: "Prepare Rice: Cook the brown rice according to package directions. (Brown rice typically takes longer, so start this first). Prepare Skewers: If using wooden skewers, soak them in water for at least 20 minutes to prevent burning. Preheat your oven to 400°F (200°C) or preheat a grill. Season: In a large bowl, combine the chicken cubes, bell pepper, and onion. Drizzle with olive oil and sprinkle with paprika, garlic powder, salt, and pepper. Toss well to coat everything evenly. Assemble: Thread the chicken and vegetables alternately onto the skewers. Cook: Baking: Place skewers on a baking sheet lined with foil. Bake for 15-20 minutes, turning halfway through, until chicken is cooked through. Grilling: Grill over medium-high heat for 10-15 minutes, turning occasionally, until chicken is cooked and has char marks. Serve: Serve the hot skewers over a bed of brown rice." 
    },
    "Snack": { 
      name: "Cucumber with Tzatziki", 
      ingredients: ["1 cucumber", "1/4 cup tzatziki sauce"], 
      steps: "Slice a cucumber into rounds or spears and serve with 1/4 cup of store-bought or homemade tzatziki sauce for dipping." 
    }
  },
  "Sunday": {
    "Breakfast": { 
      name: "Mushroom, Spinach & Goat Cheese Omelet", 
      ingredients: ["1 tsp olive oil or butter", "1/2 cup sliced mushrooms (cremini or white)", "1 handful of fresh spinach", "3 large eggs", "1 tbsp milk or water", "Salt and pepper to taste", "1 oz (about 2 tbsp) crumbled goat cheese"], 
      steps: "Heat oil or butter in a non-stick skillet over medium heat. Add the mushrooms and sauté for 3-4 minutes until browned. Add the spinach and cook until wilted. Remove the vegetables from the pan and set aside. In a bowl, whisk the eggs with milk, salt, and pepper until frothy. Pour the egg mixture into the same skillet. As the eggs begin to set, gently push the cooked portions from the edges toward the center. When the eggs are nearly set but still soft on top, sprinkle the cooked mushrooms, spinach, and goat cheese over one half of the omelet. Carefully fold the other half over the filling. Cook for another 30 seconds, then slide onto a plate." 
    },
    "Lunch": { 
      name: "Quick Falafel Plate", 
      ingredients: ["4-6 store-bought falafel balls", "1 cup mixed greens", "1/2 cucumber, diced", "1/2 Roma tomato, diced", "2 tbsp tahini sauce for drizzling"], 
      steps: "Heat the falafel according to package directions (this can be done in a microwave, air fryer, or oven). While the falafel heats, prepare a simple salad by placing the mixed greens, cucumber, and tomato on a plate or in a bowl. Place the warm falafel alongside the salad. Drizzle everything with the tahini sauce before serving." 
    },
    "Dinner": { 
      name: "Deconstructed Ratatouille with Lentils & Roasted Potatoes", 
      ingredients: ["2 medium potatoes (like Yukon Gold), cut into 1-inch cubes", "1 tbsp olive oil", "Salt and pepper", "1 tbsp olive oil", "2 cloves garlic, minced", "1/2 small eggplant, diced", "1 small zucchini, diced", "1/2 red bell pepper, diced", "1 cup canned diced tomatoes (undrained)", "1 cup cooked lentils (canned or pre-cooked)", "1/2 tsp dried herbs (oregano or herbs de Provence)"], 
      steps: "Preheat oven to 400°F (200°C). On a baking sheet, toss the potato cubes with 1 tbsp olive oil, salt, and pepper. Roast for 25-30 minutes, or until golden brown and crispy, flipping halfway through. While potatoes roast, make the ratatouille. Heat 1 tbsp olive oil in a large skillet or pot over medium-high heat. Add the diced eggplant and cook for 5 minutes until it begins to soften. Add the zucchini and bell pepper and cook for another 5 minutes. Add the minced garlic and cook for 1 minute until fragrant. Stir in the diced tomatoes (with their juice), cooked lentils, and dried herbs. Bring to a simmer, then reduce heat and cook for 5-10 minutes for the flavors to meld. Season with salt and pepper to taste. Serve the lentil and vegetable ratatouille with the crispy roasted potatoes on the side or mixed in." 
    },
    "Snack": { 
      name: "Pear with Sunflower Seed Butter", 
      ingredients: ["1 ripe pear", "2 tablespoons sunflower seed butter"], 
      steps: "Slice one ripe pear and serve with 2 tablespoons of sunflower seed butter." 
    }
  }
};

const shoppingListData: ShoppingListData = {
  "Produce": [
    "Blueberries (1 pint)", 
    "Strawberries (1 pint)", 
    "Raspberries (1 small clamshell)", 
    "Apple (1)", 
    "Pear (1)", 
    "Peach (1)", 
    "Banana (1)", 
    "Grapes (1 small bunch)", 
    "Lemons (2)",
    "Onions (3 yellow or white, 2 red)", 
    "Garlic (2 heads)", 
    "Potatoes (2 medium Yukon Gold)", 
    "Sweet Potatoes (1 large)", 
    "Carrots (1 medium)", 
    "Celery (1 stalk)", 
    "Bell Peppers (2 red, 1 green)", 
    "Zucchini (2 medium)", 
    "Eggplant (1 medium)", 
    "Brussels Sprouts (~1 lb)", 
    "Cucumbers (2 English or 3-4 Persian)", 
    "Tomatoes (4 Roma)", 
    "Cherry Tomatoes (1 pint)", 
    "Mushrooms (8 oz cremini)", 
    "Spinach (1 large bag or clamshell, ~5-6 oz)", 
    "Kale (1 bunch)", 
    "Lettuce/Mixed Greens (1 large clamshell or 2 hearts of romaine)", 
    "Fresh Parsley (1 bunch)", 
    "Fresh Mint (1 bunch)", 
    "Fresh Basil (1 small clamshell)"
  ],
  "Proteins & Dairy": [
    "Ground Turkey (1.5 lbs)", 
    "Chicken Breasts, boneless skinless (~2 lbs)", 
    "Chicken Thighs, boneless skinless (~1 lb)", 
    "Eggs (1 dozen)", 
    "Plain Greek Yogurt (1 large tub, ~32 oz)", 
    "Cottage Cheese (1 small tub, ~16 oz)", 
    "Feta Cheese (1 small block or container of crumbles)", 
    "Goat Cheese (1 small log, ~4 oz)", 
    "Mozzarella Cheese, shredded (1 bag, ~8 oz)", 
    "Mozzarella Cheese, fresh balls/bocconcini (1 container, ~8 oz)", 
    "Milk of choice (for eggs/smoothies)"
  ],
  "Pantry: Dry Goods & Legumes": [
    "Rolled Oats (~1/2 cup)", 
    "Quinoa (~1 cup)", 
    "Brown Rice (~1 cup)", 
    "Pasta (~8 oz)", 
    "Brown or Green Lentils, dry (~1 cup)", 
    "Chickpeas (3 cans, 15 oz each)", 
    "White Beans (Cannellini or Navy) (2 cans, 15 oz each)", 
    "Cooked Lentils (1 can or pouch, optional for Day 7)", 
    "Breadcrumbs, panko or regular (~1/2 cup)", 
    "Chia Seeds", 
    "Ground Flaxseed"
  ],
  "Pantry: Oils, Condiments & Sauces": [
    "Extra Virgin Olive Oil", 
    "Sunflower Seed Butter", 
    "Hummus", 
    "Tzatziki", 
    "Tahini Sauce", 
    "Honey", 
    "Maple Syrup", 
    "Marinara Sauce (~2.5 cups total)", 
    "Tomato Sauce (~1/2 cup)", 
    "Diced Tomatoes (1 can, 15 oz)", 
    "Kalamata Olives (1 jar)", 
    "Broth (Vegetable or Chicken, 1 carton, 32 oz)"
  ],
  "Pantry: Spices & Seasonings": [
    "Salt (Kosher or Sea Salt)", 
    "Black Peppercorns (for grinding)", 
    "Dried Oregano", 
    "Italian Herb Blend", 
    "Garlic Powder", 
    "Paprika (smoked recommended)", 
    "Ground Cinnamon", 
    "Dried Thyme", 
    "Red Pepper Flakes (optional)"
  ],
  "Other Items": [
    "Store-bought Falafel (1 package)", 
    "Whole-grain Tortillas/Wraps"
  ]
};

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

export default function App() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [activeTab, setActiveTab] = useState<string>("plan");
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [openDays, setOpenDays] = useState<Set<string>>(new Set());
  const [showChatBubble, setShowChatBubble] = useState(false);
  const [currentCompliment, setCurrentCompliment] = useState("");
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  // Local storage key
  const STORAGE_KEY = 'pants-pantry-grocery-list';

  // Timer ref for auto-closing the chat bubble
  const autoCloseTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Animated header styles with swirling gradient
  useEffect(() => {
    const swirlAnimation = `
      @keyframes swirlGradient {
        0% { background-position: 0% 50%; }
        25% { background-position: 50% 100%; }
        50% { background-position: 100% 50%; }
        75% { background-position: 50% 0%; }
        100% { background-position: 0% 50%; }
      }
      
      @keyframes gentleRotate {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-5deg); }
        75% { transform: rotate(5deg); }
      }
      
      @keyframes bubbleSlideIn {
        0% { 
          opacity: 0; 
          transform: translateX(-10px) scale(0.8); 
        }
        100% { 
          opacity: 1; 
          transform: translateX(0) scale(1); 
        }
      }
      
      @keyframes bubbleSlideOut {
        0% { 
          opacity: 1; 
          transform: translateX(0) scale(1); 
        }
        100% { 
          opacity: 0; 
          transform: translateX(-10px) scale(0.8); 
        }
      }
    `;
    
    const styleTag = document.createElement('style');
    styleTag.innerHTML = swirlAnimation;
    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  // Load shopping list state from localStorage on component mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsedItems = JSON.parse(saved);
        setCheckedItems(new Set(parsedItems));
      }
    } catch (error) {
      console.error('Failed to load shopping list from localStorage:', error);
    }
  }, []);

  // Save shopping list state to localStorage whenever checkedItems changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(checkedItems)));
    } catch (error) {
      console.error('Failed to save shopping list to localStorage:', error);
    }
  }, [checkedItems]);

  const toggleItemCheck = (itemId: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const toggleDay = (day: string) => {
    setOpenDays(prev => {
      const newSet = new Set(prev);
      if (newSet.has(day)) {
        newSet.delete(day);
      } else {
        newSet.add(day);
      }
      return newSet;
    });
  };

  const createItemId = (category: string, item: string) => {
    return `${category}-${item}`.replace(/[^a-zA-Z0-9-]/g, '');
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setActiveTab("recipes");
    // Smooth scroll to top when switching to recipe tab
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const getRandomCompliment = () => {
    const randomIndex = Math.floor(Math.random() * compliments.length);
    return compliments[randomIndex];
  };

  const handleFaceClick = () => {
    // Clear any existing timer
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
    }

    // Generate new compliment and show bubble
    setCurrentCompliment(getRandomCompliment());
    setShowChatBubble(true);
    setIsAnimatingOut(false);

    // Set 3-second auto-close timer
    autoCloseTimerRef.current = setTimeout(() => {
      setIsAnimatingOut(true);
      setTimeout(() => {
        setShowChatBubble(false);
        setIsAnimatingOut(false);
      }, 300); // Wait for animation to finish
    }, 3000);
  };

  const handleBubbleClick = () => {
    // Clear the timer and close immediately
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
    }
    
    setIsAnimatingOut(true);
    setTimeout(() => {
      setShowChatBubble(false);
      setIsAnimatingOut(false);
    }, 300); // Wait for animation to finish
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
      }
    };
  }, []);

  const handleChatClick = () => {
    if (showChatBubble) {
      setIsAnimatingOut(true);
      autoCloseTimerRef.current = setTimeout(() => {
        setShowChatBubble(false);
        setIsAnimatingOut(false);
      }, 3000);
    } else {
      handleFaceClick();
    }
  };

  const handleChatClose = () => {
    setShowChatBubble(false);
  };

  const completedItemsCount = checkedItems.size;
  const totalItemsCount = Object.values(shoppingListData).flat().length;
  const completionPercentage = Math.round((completedItemsCount / totalItemsCount) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-emerald-50 to-amber-50">
      <div className="max-w-2xl mx-auto bg-white shadow-2xl min-h-screen border-x border-sky-100">
        {/* Header */}
        <header 
          className="relative overflow-hidden text-white p-6 sm:p-8 shadow-2xl"
          style={{
            backgroundImage: `
              radial-gradient(circle at 15% 25%, rgba(14, 165, 233, 0.8) 0%, transparent 40%),
              radial-gradient(circle at 85% 15%, rgba(16, 185, 129, 0.8) 0%, transparent 40%),
              radial-gradient(circle at 70% 85%, rgba(245, 158, 11, 0.8) 0%, transparent 40%),
              radial-gradient(circle at 25% 75%, rgba(14, 165, 233, 0.6) 0%, transparent 40%),
              radial-gradient(circle at 90% 60%, rgba(16, 185, 129, 0.6) 0%, transparent 40%)
            `,
            backgroundColor: '#0ea5e9',
            backgroundSize: '400% 400%',
            animation: 'swirlGradient 20s ease-in-out infinite'
          }}
        >
          {/* Content */}
          <div className="relative z-10 text-center space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <div className="text-white bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-xl shadow-lg border border-white/10">
                <PantsIcon />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center drop-shadow-lg">Pants' Pantry Planning</h1>
            </div>
            <p className="text-white/90 text-base sm:text-lg drop-shadow-sm">Simple, healthy, and organized.</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 sm:p-6 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-14 bg-gradient-to-r from-sky-100 via-emerald-100 to-amber-100 p-1 rounded-xl shadow-lg">
              <TabsTrigger 
                value="plan" 
                className="flex items-center gap-1 sm:gap-2 font-semibold text-sky-700 data-[state=active]:bg-white data-[state=active]:text-sky-800 data-[state=active]:shadow-md rounded-lg text-xs sm:text-sm"
              >
                <Calendar className="h-4 w-4" />
                <span>Meal Plan</span>
              </TabsTrigger>
              <TabsTrigger 
                value="recipes" 
                className="flex items-center gap-1 sm:gap-2 font-semibold text-emerald-700 data-[state=active]:bg-white data-[state=active]:text-emerald-800 data-[state=active]:shadow-md rounded-lg text-xs sm:text-sm"
              >
                <Book className="h-4 w-4" />
                <span>Recipes</span>
              </TabsTrigger>
              <TabsTrigger 
                value="grocery" 
                className="flex items-center gap-1 sm:gap-2 font-semibold text-amber-700 data-[state=active]:bg-white data-[state=active]:text-amber-800 data-[state=active]:shadow-md rounded-lg text-xs sm:text-sm"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Grocery List</span>
              </TabsTrigger>
            </TabsList>

            {/* Meal Plan Tab */}
            <TabsContent value="plan" className="mt-6 space-y-4">
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
                            className={`h-5 w-5 sm:h-6 sm:w-6 text-sky-500 transition-transform duration-300 flex-shrink-0 ml-2 ${
                              openDays.has(day) ? 'rotate-90' : ''
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
            </TabsContent>

            {/* Recipes Tab */}
            <TabsContent value="recipes" className="mt-6">
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
            </TabsContent>

            {/* Grocery List Tab */}
            <TabsContent value="grocery" className="mt-6 space-y-4 sm:space-y-6">
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
                              className={`flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl transition-all duration-200 ${
                                isChecked 
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
                                className={`flex-1 cursor-pointer transition-all duration-200 font-medium text-sm sm:text-base ${
                                  isChecked 
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
            </TabsContent>
          </Tabs>
        </main>
        
        {/* Floating Chat Widget */}
        <div className="fixed bottom-4 left-4 z-50">
          {/* Face Avatar - Always stays in the same position */}
          <div 
            className="w-12 h-12 bg-white rounded-full shadow-lg border-2 border-gray-200 overflow-hidden cursor-pointer transition-all duration-200 hover:scale-110 animate-[gentleRotate_4s_ease-in-out_infinite]"
            onClick={handleFaceClick}
          >
            <FaceIcon />
          </div>
          
          {/* Chat Bubble - Positioned absolutely relative to face */}
          {(showChatBubble || isAnimatingOut) && (
            <div 
              className={`absolute bottom-2 left-16 max-w-xs cursor-pointer transition-all duration-300 ease-out ${
                isAnimatingOut
                  ? 'opacity-0 animate-[bubbleSlideOut_0.3s_ease-out]'
                  : 'opacity-100 animate-[bubbleSlideIn_0.3s_ease-out]'
              }`}
              onClick={handleBubbleClick}
              style={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' 
              }}
            >
              <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl shadow-lg relative">
                <p className="text-sm font-medium">
                  {currentCompliment}
                </p>
                {/* Chat bubble tail */}
                <div className="absolute bottom-2 left-0 transform -translate-x-1/2">
                  <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-blue-500"></div>
                </div>
              </div>
            </div>
          )}
          
          {/* Click outside to close functionality */}
          {showChatBubble && (
            <div 
              className="fixed inset-0 z-40" 
              onClick={handleChatClose}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
}