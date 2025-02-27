const { MongoClient } = require('mongodb');
require('dotenv').config(); // Pour charger les variables d'environnement depuis .env

const url = process.env.DATABASE_URL; // Utilisation de l'URL depuis les variables d'environnement
const dbName = 'culiko';
const client = new MongoClient(url);

async function migrate() {
  try {
    // Se connecter à la base de données
    await client.connect();
    console.log('Connexion à la base de données MongoDB réussie.');

    const db = client.db(dbName);
    const usersCollection = db.collection('User');

    // Mettre à jour tous les documents de la collection User
    const result = await usersCollection.updateMany(
      { createdAt: { $exists: false }, updatedAt: { $exists: false } }, // Filtrer ceux sans createdAt et updatedAt
      {
        $set: {
          createdAt: new Date(), // Définir la date actuelle pour createdAt
          updatedAt: new Date(), // Définir la date actuelle pour updatedAt
        },
      }
    );

    console.log(`Mise à jour de ${result.modifiedCount} utilisateurs avec createdAt et updatedAt.`);
  } catch (error) {
    console.error('Erreur lors de la migration:', error);
  } finally {
    // Fermer la connexion
    await client.close();
    console.log('Connexion fermée.');
  }
}

// Lancer la migration
migrate().catch(console.error);
