# amazone_rds_nodejs
Using NodeJS to working with Amazone RDS MySQL
# Run
    Create new mysql database at AWS RDS
    Copy infor database instance to .env
    Run cmd "Node index.js"
    Create user
        Method: POST
            http://localhost:3000/users?username=Hoang Tien Hoa4&email=ht.hoa.0603@gmail.com&age=32
    Get User
        Method: GET
            http://localhost:3000/users
# Ref

    Create database and Connect to AWS RDS using NodeJS
        https://www.youtube.com/watch?v=6Nt-Jl3CzxE
    Note: Don't forget to create new VPC and Type A NAME for Database

    Connect RDS mysql to Mysql Workbench
        https://repost.aws/knowledge-center/connect-rds-mysql-workbench
