/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('shops', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    nama: {
      type: 'varchar(100)',
      notNull: true,
    },
    pemilik: {
      type: 'varchar(100)',
      notNull: true,
    },
    alamat: {
      type: 'text',
      notNull: true,
    },
    block_id: {
      // Add this field
      type: 'integer',
      notNull: true,
      references: 'blocks',
      onDelete: 'restrict',
    },
    foto: {
      type: 'varchar(255)',
      notNull: false,
    },
    deskripsi: {
      type: 'text',
      notNull: false,
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })

  pgm.createIndex('shops', 'block_id') // Add index for better performance
}

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.down = (pgm) => {
  pgm.dropTable('shops')
}
