// Wszystkie teksty widoczne na stronie. Każdy język (pl.ts, en.ts) musi mieć dokładnie te klucze,
// więc jak dodasz tu nowy tekst, TypeScript pokaże błąd w pliku języka, któremu go brakuje.
// Język wybiera się w language.ts.
// Teksty z parametrami są funkcjami, np. greeting('jan') => "Witaj, jan!"

export type Language = 'pl' | 'en';

export interface Translations {

  /** Format dat (nazwa miesiąca nad kalendarzem, skróty dni tygodnia), np. 'pl-PL' */
  locale: string;

  /** Teksty używane w wielu miejscach */
  common: {
    /** Przycisk zamykający okno bez zapisywania */
    cancel: string;
    /** Przycisk zapisu w oknach panelu admina */
    save: string;
    /** Przycisk zamykający okno podglądu */
    close: string;
    /** Przycisk usuwania przy produktach i przepisach */
    delete: string;
    /** Przycisk dodania produktu/przepisu do zjedzonych (wyszukiwarka) */
    add: string;
    /** Etykieta i placeholder pola z wagą w gramach */
    weightGrams: string;
    /** Skrót białka przy makroskładnikach, np. "B: 20g" */
    proteinShort: string;
    /** Skrót tłuszczów przy makroskładnikach, np. "T: 5g" */
    fatShort: string;
    /** Skrót węglowodanów przy makroskładnikach, np. "W: 30g" */
    carbsShort: string;
    /** Plakietka przed wartościami produktu w wyszukiwarce, np. "W 100g:" */
    per100g: string;
    /** Etykieta pola: imię */
    firstName: string;
    /** Etykieta pola: nazwisko */
    lastName: string;
    /** Etykieta pola: login */
    login: string;
    /** Etykieta pola: e-mail */
    email: string;
    /** Etykieta pola: hasło */
    password: string;
    /** Komunikat (toast), gdy waga jest pusta lub <= 0 */
    invalidWeight: string;
  };

  /** Górny pasek nawigacji i stopka (app.component.html) */
  nav: {
    home: string;
    dietPanel: string;
    adminPanel: string;
    /** Powitanie zalogowanego użytkownika w pasku */
    greeting: (login: string | null) => string;
    logout: string;
    login: string;
    register: string;
    /** Stopka, po "© 2026" */
    allRightsReserved: string;
  };

  /** Okno logowania (app.component.html / .ts) */
  login: {
    title: string;
    subtitle: string;
    loginPlaceholder: string;
    forgotPassword: string;
    submit: string;
    /** Tekst przed linkiem do rejestracji pod przyciskiem logowania */
    noAccount: string;
    registerLink: string;
    /** Toast po udanym logowaniu */
    loggedInAs: (login: string) => string;
    /** Toasty z błędami logowania */
    wrongPassword: string;
    wrongLogin: string;
    serviceError: string;
  };

  /** Strona główna (home.component.html) */
  home: {
    heroTitle: string;
    heroText: string;
    /** Przycisk dla zalogowanego */
    goToPanel: string;
    /** Przyciski dla niezalogowanego */
    createAccount: string;
    haveAccount: string;
    /** Tekst alternatywny logo */
    logoAlt: string;
    /** Trzy kafelki z opisem funkcji */
    feature1Title: string;
    feature1Text: string;
    feature2Title: string;
    feature2Text: string;
    feature3Title: string;
    feature3Text: string;
  };

  /** Strona rejestracji (register.component.html / .ts) */
  register: {
    title: string;
    subtitle: string;
    firstNamePlaceholder: string;
    lastNamePlaceholder: string;
    loginPlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    confirmPassword: string;
    confirmPasswordPlaceholder: string;
    submit: string;
    /** Tekst przed linkiem do logowania na dole karty */
    haveAccount: string;
    loginLink: string;
    /** Toast po założeniu konta */
    success: string;
    /** Toast z błędem; message to treść błędu z serwera */
    error: (message: string) => string;
  };

  /** Panel administracyjny - lista użytkowników (user.component.html / .ts) */
  admin: {
    title: string;
    searchPlaceholder: string;
    addButton: string;
    /** Nagłówki kolumn tabeli */
    columnUser: string;
    columnStatus: string;
    columnEmail: string;
    columnActions: string;
    /** Status konta w tabeli */
    statusActive: string;
    statusPending: string;
    /** Podpowiedzi (title) przycisków akcji */
    viewTooltip: string;
    editTooltip: string;
    deleteTooltip: string;
    /** Pusta tabela */
    empty: string;
    /** Okno usuwania: "{deleteConfirmBefore}<login>{deleteConfirmAfter}" */
    deleteTitle: string;
    deleteConfirmBefore: string;
    deleteConfirmAfter: string;
    deleteWarning: string;
    deleteConfirmButton: string;
    /** Okno edycji */
    editTitle: string;
    roleLabel: string;
    roleUser: string;
    roleAdmin: string;
    accountActivity: string;
    active: string;
    inactive: string;
    /** Okno dodawania */
    addTitle: string;
    /** Okno podglądu */
    viewTitle: string;
    /** Toasty z błędami; message to treść błędu z serwera */
    addError: (message: string) => string;
    editError: (message: string) => string;
  };

  /** Panel diety - górna część z podsumowaniem i zakładkami (diet.component.html / .ts) */
  diet: {
    /** Tytuły kart z paskami postępu */
    calories: string;
    protein: string;
    fats: string;
    carbs: string;
    /** Pod paskiem postępu, np. "Zostało 420 kcal" */
    remaining: (amount: number, unit: string) => string;
    /** Pod paskiem postępu po przekroczeniu celu, np. "Ponad limit o 80 kcal" */
    overLimit: (amount: number, unit: string) => string;
    /** Zakładki */
    tabEaten: string;
    tabCreated: string;
    tabRecipes: string;
    tabGoals: string;
  };

  /** Nazwy posiłków (mealTimes.ts) - nagłówki w "Zjedzone dzisiaj" i lista wyboru posiłku */
  meals: {
    breakfast: string;
    secondBreakfast: string;
    lunch: string;
    snack: string;
    dinner: string;
    /** Podpowiedzi (title) przycisków "+" przy posiłkach */
    addToBreakfast: string;
    addToSecondBreakfast: string;
    addToLunch: string;
    addToSnack: string;
    addToDinner: string;
  };

  /** Zakładka "Zjedzone dzisiaj" (viewProducts.component.html / .ts) */
  eaten: {
    title: string;
    /** Podpowiedź (title) przycisku "Usuń" */
    deleteTooltip: string;
    /** Pusty posiłek: tekst + link */
    emptyMeal: string;
    emptyMealLink: string;
    /** Toast z błędem usuwania */
    deleteError: string;
  };

  /** Wyszukiwarka produktów i dodawanie własnego produktu (addProduct.component.html / .ts) */
  addProduct: {
    searchPlaceholder: string;
    addOwnButton: string;
    /** Plakietka przy przepisie w wynikach, np. "Cały przepis (800g):" */
    wholeRecipe: (grams: number) => string;
    /** Okno "Dodaj nowy produkt" */
    modalTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    kcalPer100g: string;
    proteinGrams: string;
    carbsGrams: string;
    fatsGrams: string;
    defaultPortion: string;
    defaultPortionPlaceholder: string;
    productCode: string;
    productCodePlaceholder: string;
    saveProduct: string;
    /** Toasty */
    nameRequired: string;
    productSaved: string;
    productSaveError: string;
    addedToEaten: string;
    addToEatenError: string;
    recipeAddedToEaten: string;
    recipeAddToEatenError: string;
  };

  /** Zakładka "Stworzone przeze mnie" (viewCreatedProducts.component.html / .ts) */
  created: {
    productsTitle: string;
    recipesTitle: string;
    /** Podpowiedzi (title) przycisków "Usuń" */
    deleteProductTooltip: string;
    deleteRecipeTooltip: string;
    /** Okienka potwierdzenia (confirm) */
    confirmDeleteProduct: string;
    confirmDeleteRecipe: string;
    /** Toasty z błędami */
    deleteProductError: string;
    deleteRecipeError: string;
  };

  /** Karty i szczegóły przepisu - wspólne dla zakładek "Przepisy" i "Stworzone przeze mnie" */
  recipe: {
    /** Podpowiedź (title) przy najechaniu na kartę przepisu */
    showDetailsTooltip: string;
    /** "1 porcja: 400g" */
    onePortion: string;
    /** "Ilość porcji: 2" */
    portions: string;
    ingredients: string;
    /** Napis na zastępczym zdjęciu przepisu */
    noPhoto: string;
    preparation: string;
    noDescription: string;
    /** Nagłówek sekcji dodawania przepisu do zjedzonych, z datą */
    addToEatenFor: (date: string) => string;
    meal: string;
    weightPlaceholder: string;
    addToEaten: string;
    /** Zielona plakietka po dodaniu, z datą */
    addedToEaten: (date: string) => string;
    addToEatenError: string;
  };

  /** Zakładka "Przepisy" - wyszukiwarka i dodawanie przepisu (recipeView.component.html / .ts) */
  recipes: {
    searchPlaceholder: string;
    addButton: string;
    /** Krok 1: szczegóły przepisu */
    step1Title: string;
    nameLabel: string;
    namePlaceholder: string;
    headerLabel: string;
    headerPlaceholder: string;
    prepTime: string;
    prepTimePlaceholder: string;
    portionsLabel: string;
    portionsPlaceholder: string;
    portionWeight: string;
    macrosForWholeRecipe: string;
    kcal: string;
    proteinGrams: string;
    carbsGrams: string;
    fatsGrams: string;
    preparationPlaceholder: string;
    nextButton: string;
    /** Krok 2: wybór składników */
    step2Title: string;
    productSearchPlaceholder: string;
    selectedCount: string;
    /** Plakietka przy dodanym składniku, np. "Dodano (100g)" */
    added: string;
    back: string;
    saveRecipe: string;
    /** Toasty */
    nameRequired: string;
    invalidIngredient: string;
    saveError: string;
  };

  /** Zakładka "Moje cele" i kalkulator (dietGoals.component.html / .ts, calorieCalculator.ts) */
  goals: {
    title: string;
    intro: string;
    /** Przełącznik trybu */
    modeManual: string;
    modeCalculator: string;
    /** Karty z celami */
    calories: string;
    protein: string;
    fats: string;
    carbs: string;
    /** Podpowiedź pod kartami */
    kcalFromMacros: string;
    /** Wzór pokazywany obok, w nawiasie */
    kcalFormula: string;
    macrosDiffer: (kcal: number) => string;
    invalidValues: string;
    restoreDefaults: string;
    saveGoals: string;
    /** Zielona plakietka po zapisie */
    saved: string;
    /** Toasty */
    invalidGoalsToast: string;
    saveError: string;
    /** Formularz kalkulatora */
    sex: string;
    male: string;
    female: string;
    age: string;
    agePlaceholder: string;
    weight: string;
    weightPlaceholder: string;
    height: string;
    heightPlaceholder: string;
    activity: string;
    goal: string;
    /** Wynik kalkulatora */
    bmr: string;
    tdee: string;
    fillParameters: string;
    calculatorNote: string;
    useAsGoals: string;
    /** Opcje listy "Aktywność fizyczna" */
    activityNone: string;
    activityLow: string;
    activityMedium: string;
    activityHigh: string;
    activityVeryHigh: string;
    /** Przyciski wyboru celu */
    goalLose: string;
    goalMaintain: string;
    goalGain: string;
  };
}
