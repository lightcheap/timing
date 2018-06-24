class AddOmniauthToSocialAccounts < ActiveRecord::Migration[5.1]
  def change
    add_column :social_accounts, :user_id, :integer
    add_column :social_accounts, :provider, :string
    add_column :social_accounts, :uid, :string
    add_column :social_accounts, :name, :string
    add_column :social_accounts, :token, :string
  end
end
