import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db';
import { Region } from '../models/Region';
import { Era } from '../models/Era';
import { Admin } from '../models/Admin';
import { regionsSeedData, erasSeedData } from './seedData';

const seed = async (): Promise<void> => {
  try {
    await connectDB();

    console.log('🗑️  Clearing existing data...');
    await Region.deleteMany({});
    await Era.deleteMany({});
    await Admin.deleteMany({});

    console.log('👤 Seeding admin account...');
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const admin = await Admin.create({
      username: 'admin',
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      password: hashedPassword,
      role: 'super_admin',
    });
    console.log(`   ✅ Created admin: ${admin.username} (${admin.email})`);

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
    console.log(`   Admin: ${admin.username}`);
    console.log(`   Regions: ${regions.length}`);
    console.log(`   Eras: ${eras.length}`);
    console.log('\n⚠️  Default admin credentials:');
    console.log(`   Username: admin`);
    console.log(`   Password: admin123`);
    console.log('   Please change the password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seed();
