import { DatabaseSync } from 'node:sqlite';
import path from 'path';

class MealsDatabase {
    constructor() {
        this.dbPath = path.join(process.cwd(), 'meals.db');
        this.db = null;
        this.statements = {};
    }

    // Veritabanını aç ve prepared statements'ları hazırla
    connect() {
        if (!this.db) {
            this.db = new DatabaseSync(this.dbPath);

            // Prepared statements'ları cache'le - performans için
            this.statements = {
                getAllMeals: this.db.prepare('SELECT * FROM meals'),
                getMealBySlug: this.db.prepare('SELECT * FROM meals WHERE slug = ?'),
                insertMeal: this.db.prepare(`
          INSERT INTO meals (slug, title, image, summary, instructions, creator, creator_email)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `),
                updateMeal: this.db.prepare(`
                    UPDATE meals
                    SET title         = ?,
                        image         = ?,
                        summary       = ?,
                        instructions  = ?,
                        creator       = ?,
                        creator_email = ?
                    WHERE slug = ?
                `),
                deleteMeal: this.db.prepare('DELETE FROM meals WHERE slug = ?'),
                searchMeals: this.db.prepare(`
          SELECT * FROM meals 
          WHERE title LIKE ? OR summary LIKE ? OR creator LIKE ?
        `)
            };
        }
        return this.db;
    }

    // Tüm yemekleri getir
    async getAllMeals() {
        try {
            this.connect();
            // await new Promise((resolve) => setTimeout(resolve, 3000));
            // throw new Error('Loading meals failed!');
            return this.statements.getAllMeals.all();
        } catch (error) {
            console.error('Error getting meals:', error);
            throw error;
        }
    }

    // Belirli bir yemeği slug ile getir
    async getMealBySlug(slug) {
        try {
            this.connect();
            return this.statements.getMealBySlug.get(slug) || null;
        } catch (error) {
            console.error('Error getting meal:', error);
            return null;
        }
    }

    // Yeni yemek ekle
    async addMeal(meal) {
        try {
            this.connect();
            const result = this.statements.insertMeal.run(
                meal.slug,
                meal.title,
                meal.image,
                meal.summary,
                meal.instructions,
                meal.creator,
                meal.creator_email
            );

            return { success: true, id: result.lastInsertRowid };
        } catch (error) {
            console.error('Error adding meal:', error);
            return { success: false, error: error.message };
        }
    }

    // Yemek güncelle
    async updateMeal(slug, meal) {
        try {
            this.connect();
            const result = this.statements.updateMeal.run(
                meal.title,
                meal.image,
                meal.summary,
                meal.instructions,
                meal.creator,
                meal.creator_email,
                slug
            );

            return { success: true, changes: result.changes };
        } catch (error) {
            console.error('Error updating meal:', error);
            return { success: false, error: error.message };
        }
    }

    // Yemek sil
    async deleteMeal(slug) {
        try {
            this.connect();
            const result = this.statements.deleteMeal.run(slug);
            return { success: true, changes: result.changes };
        } catch (error) {
            console.error('Error deleting meal:', error);
            return { success: false, error: error.message };
        }
    }

    // Arama yap
    async searchMeals(query) {
        try {
            this.connect();
            const searchQuery = `%${query}%`;
            return this.statements.searchMeals.all(searchQuery, searchQuery, searchQuery);
        } catch (error) {
            console.error('Error searching meals:', error);
            return [];
        }
    }

    // Uygulama kapanırken veritabanını kapat
    close() {
        if (this.db) {
            this.db.close();
            this.db = null;
            this.statements = {};
        }
    }
}

// Singleton instance oluştur
const mealsDb = new MealsDatabase();

// Export edilen fonksiyonlar - API değişmeden class'a geçiş
export const getMeals = async () => await mealsDb.getAllMeals();
export const getMeal = async (slug) => await mealsDb.getMealBySlug(slug);
export const addMeal = async (meal) => await mealsDb.addMeal(meal);
export const updateMeal = async (slug, meal) => await mealsDb.updateMeal(slug, meal);
export const deleteMeal = async (slug) => await mealsDb.deleteMeal(slug);
export const searchMeals = async (query) => await mealsDb.searchMeals(query);

// Graceful shutdown için
export const closeDatabase = () => mealsDb.close();