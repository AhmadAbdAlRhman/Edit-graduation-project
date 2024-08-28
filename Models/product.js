const {Sequelize , DataTypes} = require("sequelize");
const sequelize = require("../config/database");
const Store = require("./store");
const Product = sequelize.define(
  "product",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    count: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    photo_data: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    StoreId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Store, // name of the table being referenced
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    size: {
      type: DataTypes.STRING,
      defaultValue:'small,medium,large',
    },
    color: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    kind: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    AvgOfRating: {
      type: Sequelize.DOUBLE,
      defaultValue: 0,
    },
    NumberOfRating: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "products",
    timestamps: false, // if you don't have timestamp fields
  }
);


addSize = async (id, newSize) =>{
  try{
    const record = await Product.findByPk(id);
    if (!record){
      throw new Error('Record not found');  
    }
    let sizes = record.size ? record.size.split(',') : [];3
    if (!sizes.includes(newSize)){
      sizes.push(newSize);
    }else{
      console.log('This size is already existed');
      return;
    }
    let updatedSize = sizes.join(',');
    await Product.update({size:updatedSize});
    console.log('Size added successfully');
  }catch (error){
    console.error(error);
  }
}

module.exports = Product;
