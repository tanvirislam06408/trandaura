"use client";


const faqs = [
  {
    question: "How long does delivery take?",
    answer:
      "Most orders are delivered within 24 hours. We dispatch daily to ensure your fruits arrive fresh.",
  },
  {
    question: "What is your return policy for fruits?",
    answer:
      "If any fruit arrives damaged or spoiled, please contact us within 24 hours of delivery. We will issue a replacement or refund immediately.",
  },
  {
    question: "How can I track my order?",
    answer:
      "After your order is shipped, you'll receive a tracking ID via email. You can also check your order status anytime from your account dashboard.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We currently support Cash on Delivery (COD), Visa, MasterCard, and popular mobile payment options where available.",
  },
];

export default function Faq() {

  return (
   <section className="bg-gray-50 section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-14 text-center">
          <span className="section-badge">
            FAQ
          </span>

          <h2 className="section-heading mt-3">
            Frequently Asked Questions
          </h2>

          <p className="section-desc">
            Find answers to the most common questions about shopping,
            payments, shipping, and returns.
          </p>
        </div>

        <div className="divide-y divide-gray-100 card-base">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="px-6 py-8 md:grid md:grid-cols-12 md:gap-10 md:px-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 md:col-span-5">
                {faq.question}
              </h3>

              <p className="mt-3 leading-7 text-gray-600 md:col-span-7 md:mt-0">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}