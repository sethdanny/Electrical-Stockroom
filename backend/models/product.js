import { v4 as uuidv4 } from 'uuid';
import { DataTypes } from 'sequelize';

const productModel = (sequelize, User) => {
	const Product = sequelize.define('Product', {
		id: {
			type: DataTypes.UUID,
			defaultValue: () => uuidv4(),
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		price: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
			validate: {
				min: 0,
			},
		},
		imageUrl: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.TEXT,
		},
		brand: {
			type: DataTypes.STRING,
		},
		creatorId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: User, 
				key: 'id',
			},
		},
	});

	return Product;
};

export default productModel;