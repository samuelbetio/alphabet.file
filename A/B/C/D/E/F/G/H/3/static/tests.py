from django.core import management

from healingcirclemassage.common.tests import CommonTestCase

class TestStory(CommonTestCase):
    def setUp(self):
        CommonTestCase.setUp(self)

    def test_navigation(self):
        """ Alice goes to the home page

        she should...
        """
        alice = self.alice
        # see the index page
        templates_used = ["static_section.html", "base.html"]
        doc = alice.clicks_a_link("/", templates_used=templates_used)
        # follow the links to the other static sections
        for link in ["faq", "news", "resume", "services", "writings", "testimonials", "events", "appointments", "instructional_dvd"]:
            alice.clicks_a_link("/"+link+"/")

    def test_email_submit(self):
        """ Alice wants to add her email address to the email list

        she should...
        """
        alice = self.alice
        # go to the home page
        doc = alice.clicks_a_link("/")
        # submit the email form
        alice.submits_a_form(doc=doc, form_css_id="email", post_data={"email":"alice@emlprime.com"})
        
    def test_form(self):
        """Alice wants to make an appointment

        she should...
        """
        alice = self.alice
        # Go to the appointments page
        doc = alice.clicks_a_link("/appointments/")
        # Sumbits the form
        alice.submits_a_form(doc=doc, form_css_id="appointment", post_data={"first_name": "alice", "last_name": "smith", "phone_number": "555-5555", "email": "alice@emlprime.com", "description": "none"})
        
