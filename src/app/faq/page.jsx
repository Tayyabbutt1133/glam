"use client"
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Container from '../../../components/container';
import { lexendDeca, jost } from '../../../components/ui/fonts';
import Breadcrumb from '../../../components/BreadCrumb';

const topics = [
  { id: 'delivery', name: 'Delivery and Shipping' },
  { id: 'account', name: 'My Account' },
  { id: 'orders', name: 'Orders' },
  { id: 'payments', name: 'Payments and Discounts' },
  { id: 'returns', name: 'Returns and Refunds' }
];

const faqData = {
  delivery: [
    {
      question: 'I have received an incorrect/damaged item with my order. What should I do?',
      answer: 'We aim to deliver your order perfectly every time, but mistakes and damages can happen occasionally. If the item you received is damaged or not what you originally ordered, please send over your order number, a few photos of the fault and a short description of what has gone wrong to cs@glambeauty.com and we will get this resolved as soon as possible.'
    },
    {
      question: 'There is an item missing from my order. What should I do?',
      answer: 'Sometimes we ship items separately to make sure that any delayed items do not hold up the rest of the order. It is therefore possible that the missing item may be on a separate shipment. Your dispatch confirmation email will list the items that have been sent. If the missing item is not on there then you will need to allow longer for it to be delivered. If the item has been sent, then please send an email to our Customer Service team.'
    },
    {
      question: 'What happens if I am not at home to accept my delivery?',
      answer: 'Do not worry, if your order cannot fit through the letterbox or requires a signature then you should receive a calling card. This card is from the courier and lets you know where your parcel is and how you can collect it.'
    },
    {
      question: 'How long will it take for my order to be delivered?',
      answer: 'Our Delivery Information page can tell you the timeframes associated with our different delivery options alongside their costs.'
    },
    {
      question: 'How long will it take for my order to be dispatched?',
      answer: 'Orders placed before 12:00 pm are usually dispatched the same day Monday to Friday. Our team works to dispatch all orders as quickly as possible although same-day is not always possible. We guarantee that express deliveries will be dispatched on-time.'
    },
    {
      question: 'What delivery options do you offer?',
      answer: 'All our delivery options can be found on our Delivery Information page.'
    },
    {
      question: 'What do I do if I have not received my order?',
      answer: 'We send you an email as soon as your order is on the way, so that you can find out when it will arrive. For tracked orders, you can use the tracking link provided in your email or located in your account to check where your order is. Have you checked for any delivery cards? Your parcel may have been left somewhere safe, such as with a neighbor or been taken to a local depot. Our Delivery Information page can give you more information and timescales. If you do need to report your order as lost then please contact our Customer Service via email cs@glambeauty.com.'
    }
  ],
  account: [
    {
      question: 'How do I unsubscribe?',
      answer: 'If you no longer want to receive our exclusive offers and promotions then you can log in to your account and select the "Email Preferences" option to make this change.'
    },
    {
      question: 'I have forgotten my password. What should I do?',
      answer: 'Do not worry, if you visit our log in page and select "Forgotten your password?" then you can enter the email address registered and we will send you instructions on how to get this reset.'
    },
    {
      question: 'Are my personal details safe if I create an account?',
      answer: 'You can rest assured that shopping with GlamBeauty is safe. We are fully compliant with the data protection act so we care about keeping your details secure. For further information, please visit our Privacy Policy page.'
    },
    {
      question: 'How do I change my account details?',
      answer: 'It is easy to make changes to your details, whether it is your payment information, password or address book. Log in to your account and you will see a range of categories at the bottom of the page under "Account Settings".'
    },
    {
      question: 'How do I register to receive special offers?',
      answer: 'We will automatically sign you up when you register so that we can make sure you are in the know regarding all our special offers. You can stop these emails by logging into your account and selecting the "Email Preferences" option.'
    },
    {
      question: 'How do I register?',
      answer: 'You will need to register before you can place an order with GlamBeauty. As long as you have a valid email address, then you can head over to our sign up page to get in on all the beauty action.'
    }
  ],
  orders: [
    {
      question: 'How do I make changes to my order?',
      answer: 'Once you have placed your order we cannot make any changes to it. If you want to try and cancel so that a new order can be placed, then you will need to log in to your account. Select the relevant order and you will see that you can choose to cancel individual items or the whole order. We will send you an email within an hour to let you know if the cancellation worked. Please do not place a new order until you hear from us.'
    },
    {
      question: 'How do I place an order?',
      answer: 'It is easy to place an order with us. Log in to your account to begin browsing our range. Once you have found the product you want, you will need to click "Add to basket". You can either carry on shopping or click "View Basket" if you have got everything you need; this will give you the option to checkout. If you have any addresses or payment options saved to your account then these will automatically display in the checkout, making it quick and easy to complete the order. Otherwise you will need to enter the details manually. Check everything is correct and you are good to go. We will send you an email as soon as the order is on its way.'
    }
  ],
  payments: [
    {
      question: 'Will I be charged VAT?',
      answer: 'For all deliveries to addresses within the UK, the price shown is inclusive of VAT. Any order placed for delivery outside of the UK could result in import duties and taxes (including VAT). We recommend that you contact your local customs office for information as customs policies and practices vary widely from country to country.'
    },
    {
      question: 'How can I pay for my order?',
      answer: 'You can pay using Credit/Debit card, PayPal and Apple Pay. If opting to pay with Apple Pay, please double-check the delivery address on your Apple Pay account is correct.'
    }
  ],
  returns: [
    {
      question: 'The product I bought is not right for me, but it has only been used once, can I return it?',
      answer: 'Unfortunately, we are unable to accept returns of unsealed/used items, unless the item is faulty. If you believe that your item is faulty, please send a detailed image/video of the fault along with your name, order number and full address to cs@glambeauty.com. Our team will aim to resolve the issue within 2 working days.'
    },
    {
      question: 'When will I receive my refund?',
      answer: 'Your refund should be returned to your account within 5 working days and we will send you an email to let you know it is on its way! If you do not receive your refund and it has been 10 working days since you received our email, then you need to contact our Customer Service team through your account.'
    },
    {
      question: 'Can I return a product if I no longer want it?',
      answer: 'We want all of our customers to enjoy their products, so if you are not happy with your order you can send it back to us. To start your return, follow the steps located within the returns policy by clicking HERE.'
    },
    {
      question: 'What is your returns policy?',
      answer: 'Please refer to our returns policy page for more information. If this does not answer your question then our Customer Service team is on hand to help. You can contact them through your account.'
    }
  ]
};

const FAQSection = () => {
  const [selectedTopic, setSelectedTopic] = useState('delivery');
  const [openQuestions, setOpenQuestions] = useState(new Set());

  const toggleQuestion = (question) => {
    setOpenQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(question)) {
        newSet.delete(question);
      } else {
        newSet.add(question);
      }
      return newSet;
    });
  };

    const currentTopic = topics.find((t) => t.id === selectedTopic);
    
const breadcrumbLinks = [
    { name: "Home", route: "/" },
    { name: "Partnerships & Suppliers", route: "/Partnerships & Suppliers" },
  ]
  

    return (
        <Container>
            <Breadcrumb links={breadcrumbLinks}/>
            <div className="my-16">
                <h1 className={`text-center mb-10 text-sm lg:text-2xl ${jost.className}`}>How can we help ?</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <h2 className={`text-xl ${jost.className} font-semibold mb-4`}>Select A Topic</h2>
          <div className="space-y-2">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`w-full ${jost.className} text-left px-4 py-2 rounded-lg transition-colors ${
                  selectedTopic === topic.id
                    ? 'bg-black text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {topic.name}
              </button>
            ))}
          </div>
        </div>

        <div className="md:w-3/4">
                        <h1 className={`text-2xl font-semibold mb-6 ${jost.className}`}>
            {currentTopic?.name}
          </h1>
          <div className="space-y-4">
            {faqData[selectedTopic]?.map((faq, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleQuestion(faq.question)}
                  className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition-colors"
                >
                        <span className={`font-medium ${jost.className} text-left`}>{faq.question}</span>
                  {openQuestions.has(faq.question) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openQuestions.has(faq.question) && (
                  <div className="p-4 bg-gray-50 border-t">
                            <p className={`text-gray-700 ${lexendDeca.className} leading-relaxed`}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
            </div>
            </Container>
  );
};

export default FAQSection;