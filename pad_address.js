#!/usr/bin/env node

/**
 * Pad Ethereum address to 32-byte format
 * Converts: 0x5fb3cbcd14b48e7c0cc6795cf833955ef6466f73
 * To:       0x0000000000000000000000005fb3cbcd14b48e7c0cc6795cf833955ef6466f73
 */

function padAddress(address) {
  // Remove 0x prefix if present
  const addressWithoutPrefix = address.startsWith('0x') ? address.slice(2) : address;
  
  // Validate it's a valid hex address (40 hex chars = 20 bytes)
  if (!/^[0-9a-fA-F]{40}$/.test(addressWithoutPrefix)) {
    throw new Error('Invalid Ethereum address format. Must be 40 hex characters.');
  }
  
  // Pad to 64 hex characters (32 bytes) with leading zeros
  const padded = addressWithoutPrefix.padStart(64, '0');
  
  return '0x' + padded;
}

// Get address from command line or use example
const inputAddress = process.argv[2] || '0x5fb3cbcd14b48e7c0cc6795cf833955ef6466f73';

try {
  const paddedAddress = padAddress(inputAddress);
  console.log('Original address:', inputAddress);
  console.log('Padded address:  ', paddedAddress);
  console.log('\nLength:', paddedAddress.length, 'characters (32 bytes)');
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}

