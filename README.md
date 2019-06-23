## users table

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|
|email|string|null: false|

### Association
- has_many: groups, through: member
- has_many: members
- has_many: messages

## groups table

|Column|Type|Options|
|------|----|-------|
|groupName|varchar|index: true, null: false, unique: true|
|user_id|integer|null: false, foreign_key: true|