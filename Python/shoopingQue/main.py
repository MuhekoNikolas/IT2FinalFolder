

class Item():
    def __init__(self, name, price):
        self.name = name
        self.price = price

    
class Customer():
    def __init__(self,name):
        self.name = name
        self.items = {

        }

    def buy(self, item):
        name = item.name
        price = item.price
        obj = {
            "name":name,
            "price":price
        }
        self.items[len(self.items)] = obj


class Counter():
    def __init__(self):
        self.served = []
    
    def serve(self, customer:Customer):
        customerName = customer.name
        self.served.append(customerName)
    
    def checkOut(self, customer):
        pass

bread = Item("bread", 2000)

Cust  = Customer("Muheko")
Cust.buy(bread)
ShopWorker = Counter()

#print(bread, Cust, ShopWorker)

print(Cust.items)