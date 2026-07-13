import mongoose from 'mongoose';
import { connectDB } from '../config/db';
import { Region } from '../models/Region';
import { Era } from '../models/Era';
import { regionsSeedData, erasSeedData } from './seedData';

const seed = async (): Promise<void> => {
  try {
    await connectDB();

    console.log('🗑️  Clearing existing data...');
    await Region.deleteMany({});
    await Era.deleteMany({});

    console.log('🌍 Seeding regions...');
    const regions = await Region.create(
      regionsSeedData.map((r) => ({ ...r }))
    );
    console.log(`   ✅ Created ${regions.length} regions`);

    // Build a map of region names to IDs for era association
    const regionMap = new Map<string, mongoose.Types.ObjectId>();
    regions.forEach((r) => {
      regionMap.set(r.name, r._id as mongoose.Types.ObjectId);
    });

    // All eras are associated with all regions by default
    // (in production, eras would be assigned to specific regions)
    const allRegionIds = regions.map((r) => r._id);

    console.log('📅 Seeding eras...');
    const eras = await Era.create(
      erasSeedData.map((e) => ({
        ...e,
        regionIds: allRegionIds,
      }))
    );
    console.log(`   ✅ Created ${eras.length} eras`);

    console.log('\n🎉 Seed completed successfully!');
    console.log(`   Regions: ${regions.length}`);
    console.log(`   Eras: ${eras.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seed();
