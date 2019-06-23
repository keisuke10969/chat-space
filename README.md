## users table

|Column|Type|Options|
|------|----|-------|
|name|varchar|null: false|
|email|text|null: false|

### Association
- has_many: groups, through: member
- has_many: members
- has_many: messages

